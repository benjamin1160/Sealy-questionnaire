import Database from 'better-sqlite3';
import path from 'path';

// Database types
export interface Session {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  qualificationScore: number;
  qualificationTier: string | null;
  tags: string;
  currentQuestionId: string;
  lastActivityAt: string;
  completedAt: string | null;
  webhookSentAt: string | null;
  userAgent: string | null;
  ipAddress: string | null;
  referrer: string | null;
}

export interface SessionAnswer {
  id: string;
  sessionId: string;
  questionId: string;
  answerId: string;
  answerText: string | null;
  createdAt: string;
}

// Initialize database
const dbPath = path.join(process.cwd(), 'data', 'sessions.db');

function getDb(): Database.Database {
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  // Create tables if they don't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
      status TEXT NOT NULL DEFAULT 'active',
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      phone TEXT,
      qualificationScore INTEGER NOT NULL DEFAULT 0,
      qualificationTier TEXT,
      tags TEXT NOT NULL DEFAULT '[]',
      currentQuestionId TEXT NOT NULL DEFAULT 'start',
      lastActivityAt TEXT NOT NULL DEFAULT (datetime('now')),
      completedAt TEXT,
      webhookSentAt TEXT,
      userAgent TEXT,
      ipAddress TEXT,
      referrer TEXT
    );

    CREATE TABLE IF NOT EXISTS session_answers (
      id TEXT PRIMARY KEY,
      sessionId TEXT NOT NULL,
      questionId TEXT NOT NULL,
      answerId TEXT NOT NULL,
      answerText TEXT,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (sessionId) REFERENCES sessions(id) ON DELETE CASCADE,
      UNIQUE(sessionId, questionId)
    );

    CREATE INDEX IF NOT EXISTS idx_session_answers_session ON session_answers(sessionId);
  `);

  return db;
}

// Generate UUID
function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Session operations
export function createSession(data: {
  userAgent?: string | null;
  ipAddress?: string | null;
  referrer?: string | null;
}): Session {
  const db = getDb();
  const id = generateId();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO sessions (id, createdAt, updatedAt, lastActivityAt, userAgent, ipAddress, referrer)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(id, now, now, now, data.userAgent || null, data.ipAddress || null, data.referrer || null);

  return getSession(id)!;
}

export function getSession(id: string): Session | null {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM sessions WHERE id = ?');
  return stmt.get(id) as Session | null;
}

export function updateSession(id: string, data: Partial<Omit<Session, 'id' | 'createdAt'>>): Session | null {
  const db = getDb();
  const updates: string[] = ['updatedAt = ?', 'lastActivityAt = ?'];
  const values: unknown[] = [new Date().toISOString(), new Date().toISOString()];

  if (data.status !== undefined) { updates.push('status = ?'); values.push(data.status); }
  if (data.firstName !== undefined) { updates.push('firstName = ?'); values.push(data.firstName); }
  if (data.lastName !== undefined) { updates.push('lastName = ?'); values.push(data.lastName); }
  if (data.email !== undefined) { updates.push('email = ?'); values.push(data.email); }
  if (data.phone !== undefined) { updates.push('phone = ?'); values.push(data.phone); }
  if (data.qualificationScore !== undefined) { updates.push('qualificationScore = ?'); values.push(data.qualificationScore); }
  if (data.qualificationTier !== undefined) { updates.push('qualificationTier = ?'); values.push(data.qualificationTier); }
  if (data.tags !== undefined) { updates.push('tags = ?'); values.push(data.tags); }
  if (data.currentQuestionId !== undefined) { updates.push('currentQuestionId = ?'); values.push(data.currentQuestionId); }
  if (data.completedAt !== undefined) { updates.push('completedAt = ?'); values.push(data.completedAt); }
  if (data.webhookSentAt !== undefined) { updates.push('webhookSentAt = ?'); values.push(data.webhookSentAt); }

  values.push(id);

  const stmt = db.prepare(`UPDATE sessions SET ${updates.join(', ')} WHERE id = ?`);
  stmt.run(...values);

  return getSession(id);
}

export function getAllSessions(limit = 50): Session[] {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM sessions ORDER BY createdAt DESC LIMIT ?');
  return stmt.all(limit) as Session[];
}

// Answer operations
export function upsertAnswer(data: {
  sessionId: string;
  questionId: string;
  answerId: string;
  answerText?: string | null;
}): SessionAnswer {
  const db = getDb();
  const id = generateId();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO session_answers (id, sessionId, questionId, answerId, answerText, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(sessionId, questionId) DO UPDATE SET
      answerId = excluded.answerId,
      answerText = excluded.answerText
  `);

  stmt.run(id, data.sessionId, data.questionId, data.answerId, data.answerText || null, now);

  return getAnswer(data.sessionId, data.questionId)!;
}

export function getAnswer(sessionId: string, questionId: string): SessionAnswer | null {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM session_answers WHERE sessionId = ? AND questionId = ?');
  return stmt.get(sessionId, questionId) as SessionAnswer | null;
}

export function getSessionAnswers(sessionId: string): SessionAnswer[] {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM session_answers WHERE sessionId = ? ORDER BY createdAt');
  return stmt.all(sessionId) as SessionAnswer[];
}

// Combined session with answers
export function getSessionWithAnswers(id: string): (Session & { answers: SessionAnswer[] }) | null {
  const session = getSession(id);
  if (!session) return null;

  const answers = getSessionAnswers(id);
  return { ...session, answers };
}

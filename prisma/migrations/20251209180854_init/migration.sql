-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "qualificationScore" INTEGER NOT NULL DEFAULT 0,
    "qualificationTier" TEXT,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "currentQuestionId" TEXT NOT NULL DEFAULT 'start',
    "lastActivityAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    "webhookSentAt" DATETIME,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "referrer" TEXT
);

-- CreateTable
CREATE TABLE "SessionAnswer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "answerText" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SessionAnswer_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionAnswer_sessionId_questionId_key" ON "SessionAnswer"("sessionId", "questionId");

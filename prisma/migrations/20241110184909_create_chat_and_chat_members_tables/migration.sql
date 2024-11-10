-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL,
    "isGroup" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "slug" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_members" (
    "chatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_members_pkey" PRIMARY KEY ("chatId","userId")
);

-- AddForeignKey
ALTER TABLE "chat_members" ADD CONSTRAINT "chat_members_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_members" ADD CONSTRAINT "chat_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

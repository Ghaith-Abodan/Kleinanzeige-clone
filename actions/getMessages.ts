import  prisma  from '@/libs/prismadb';

const getMessages = async (
  conversationId: string
) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationID: conversationId
      },
      include: {
        sender: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return messages;
  } catch (error: any) {
    return [];
  }
};

export default getMessages;


export async function sendMessage(content) {
  if (!chatActive) return;

  const message = await ChatApi.sendMessage({ content, conversationId: chatActive.id, userId: user.id, token });
  console.log(message);

  setChatActive((prev) => ({ ...prev, messages: [...(prev?.messages || []), message] }));
  setListChats((prev) =>
    prev.map((item) =>
      item.id === chatActive.id
        ? { ...item, latestMessage: message, messages: [...(item.messages || []), message] }
        : item
    )
  );
}
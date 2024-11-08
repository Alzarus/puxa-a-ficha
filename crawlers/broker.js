const amqp = require("amqplib");

async function sendMessage(queue, message) {
  try {
    const connection = await amqp.connect(process.env.BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Mensagem enviada para ${queue}: ${message}`);

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
  }
}

module.exports = { sendMessage };

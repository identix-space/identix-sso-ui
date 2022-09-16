// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default async (req: any, res: any) => {
    // const tgbot = process.env.NEXT_TELEGRAM_TOKEN;
    console.log(req.body);

    res.status(200).send('OK');
};

const chatId = -617596475;

export const sendNotify = async (message: string) => {
    // const tgbot = process.env.NEXT_TELEGRAM_TOKEN;
    const tgbot = '5635690154:AAEkQ6N-IoqAn_iObo0Z3Sl7U5QhcQEJeQU';

    const messageText =
        `<i>New error: </i> <strong>${
            message}</strong>`;

    await fetch(
        `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${chatId}&text=${messageText}&parse_mode=HTML`);
};

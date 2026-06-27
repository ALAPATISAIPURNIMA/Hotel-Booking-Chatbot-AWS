export const handler = async (event) => {

    const slots = event.sessionState.intent.slots;

    const userName = slots.userName?.value?.interpretedValue || "Guest";
    const roomType = slots.roomType?.value?.interpretedValue || "Classic";
    const checkInDate = slots.checkInDate?.value?.interpretedValue || "";
    const stayDuration = parseInt(slots.stayDuration?.value?.interpretedValue || "1");

    const prices = {
        Classic: 2000,
        Deluxe: 3000,
        Suite: 5000,
        Duplex: 7000,
        Economy: 1500,
        Executive: 4500
    };

    const cost = prices[roomType] * stayDuration;

    const message =
        `Thanks ${userName}, your ${roomType} room is booked from ${checkInDate} for ${stayDuration} day(s). Total cost is ₹${cost}. Have a pleasant stay!`;

    return {
        sessionState: {
            dialogAction: {
                type: "Close"
            },
            intent: {
                name: event.sessionState.intent.name,
                state: "Fulfilled"
            }
        },
        messages: [
            {
                contentType: "PlainText",
                content: message
            }
        ]
    };
};

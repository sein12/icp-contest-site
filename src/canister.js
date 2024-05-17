import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../azle_test/src/backend/index.did"; // 경로를 적절히 조정하세요
const canisterId = process.env.REACT_APP_CANISTER_ID;

const agent = new HttpAgent();
const canisterActor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
});

export async function fetchMessages() {
    const response = await fetch(`${process.env.REACT_APP_CANISTER_ORIGIN}/messages`);
    return response.json();
}

export async function sendMessage(user, message) {
    await fetch(`${process.env.REACT_APP_CANISTER_ORIGIN}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, message }),
    });
}

export { canisterActor };

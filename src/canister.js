import { Actor, HttpAgent, HttpMethod } from "@dfinity/agent";
import { idlFactory } from "../../azle_test/src/backend/index.did"; // 경로를 적절히 조정하세요
const canisterId = process.env.REACT_APP_CANISTER_ID;

// HttpAgent 생성
const agent = new HttpAgent();
const canisterActor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
});

export { canisterActor };

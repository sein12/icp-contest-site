# ICP Chat 웹 프런트엔드

ICP Chat의 채널형 채팅 화면을 구현한 React 프로토타입입니다. 채널을 만들고 선택한 채널에서 메시지를 작성할 수 있으며, 샘플 멤버 목록과 Internet Identity principal을 표시하는 프로필을 제공합니다.

이 저장소의 앱 소스는 [`master` 브랜치](https://github.com/sein12/icp-contest-site/tree/master)에 있습니다. 메시지 API는 [별도 캐니스터 저장소](https://github.com/sein12/icp-contest-canister)에서 개발됐으며, 현재 채팅 화면의 데이터는 React 상태에서 관리합니다.

## 화면에서 할 수 있는 일

| 기능 | 동작 |
| --- | --- |
| 채널 탐색 | `welcome`, `announcements`, `general`, `random` 채널에서 시작합니다. 사이드바에서 채널을 선택하거나 추가·삭제할 수 있습니다. |
| 메시지 작성 | 입력란에서 `Enter`를 누르거나 `Send`를 선택하면 현재 채널의 목록에 메시지와 작성 시각이 표시됩니다. |
| 채널 리더 지정 | 샘플 멤버의 우클릭 메뉴에서 `Set as Channel Leader`를 선택하면 해당 멤버가 강조됩니다. |
| 프로필 확인 | 앱 시작 시 Internet Identity 로그인을 요청합니다. `My Profile`에서는 인증 클라이언트에서 읽은 principal을 확인할 수 있습니다. |

## 로컬에서 실행하기

Node.js와 npm이 필요합니다.

```bash
git clone --branch master https://github.com/sein12/icp-contest-site.git
cd icp-contest-site
npm ci
npm start
```

개발 서버가 시작되면 [http://localhost:3000](http://localhost:3000)을 엽니다. 인증 공급자를 바꾸려면 프로젝트 루트의 `.env.development.local`에 `REACT_APP_IDENTITY_PROVIDER`를 지정한 뒤 개발 서버를 다시 시작합니다.

```dotenv
REACT_APP_IDENTITY_PROVIDER=https://identity.ic0.app
```

`npm run build`는 배포용 정적 파일을 `build/`에 생성합니다. `npm test`에는 Create React App 초기 화면의 `Learn React` 문구를 확인하는 예제 테스트가 남아 있습니다. 현재 화면에는 해당 문구가 없습니다.

실행 안내는 소스와 설정을 기준으로 작성했습니다. 빌드와 브라우저 실행은 검증하지 않았습니다.

## 캐니스터 연동 상태

- 채널, 메시지, 리더 설정은 현재 페이지의 React 상태에만 저장됩니다. 새로고침하면 초기 상태로 돌아가며, 브라우저 간 메시지 동기화는 구현되어 있지 않습니다.
- 메시지의 작성자는 화면에서 `User`로 표시됩니다. 프로필의 Internet Identity principal은 메시지 작성자나 채널 권한에 연결되어 있지 않습니다.
- [`src/canister.js`](https://github.com/sein12/icp-contest-site/blob/master/src/canister.js)는 `/messages` 조회·전송 함수와 Candid Actor 생성 코드를 담고 있습니다. 채팅 화면에서 이 모듈을 호출하지 않으며, Actor가 참조하는 `azle_test` 프로젝트의 Candid 파일은 이 저장소에 없습니다.

| 환경 변수 | 참조 위치와 용도 |
| --- | --- |
| `REACT_APP_IDENTITY_PROVIDER` | 앱의 Internet Identity 로그인 공급자 URL |
| `REACT_APP_CANISTER_ORIGIN` | 연동 모듈의 메시지 HTTP 요청에 사용할 캐니스터 origin |
| `REACT_APP_CANISTER_ID` | 연동 모듈이 Candid Actor를 생성할 때 사용할 캐니스터 ID |

## 주요 소스

| 파일 | 역할 |
| --- | --- |
| [`src/index.tsx`](https://github.com/sein12/icp-contest-site/blob/master/src/index.tsx) | React 앱 진입점 |
| [`src/App.tsx`](https://github.com/sein12/icp-contest-site/blob/master/src/App.tsx) | 채널·메시지·멤버 상태와 로그인 흐름 |
| [`src/Sidebar.tsx`](https://github.com/sein12/icp-contest-site/blob/master/src/Sidebar.tsx), [`src/AddChannelModal.tsx`](https://github.com/sein12/icp-contest-site/blob/master/src/AddChannelModal.tsx) | 채널 목록과 채널 추가·삭제 UI |
| [`src/Chat.tsx`](https://github.com/sein12/icp-contest-site/blob/master/src/Chat.tsx), [`src/MemberList.tsx`](https://github.com/sein12/icp-contest-site/blob/master/src/MemberList.tsx) | 메시지 목록·입력과 채널 멤버·리더 UI |
| [`src/ProfileModal.tsx`](https://github.com/sein12/icp-contest-site/blob/master/src/ProfileModal.tsx) | 인증 클라이언트의 principal 표시 |

이 프로젝트는 [Create React App](https://github.com/facebook/create-react-app)으로 시작했습니다. 의존성 잠금 파일은 React 18.3.1, TypeScript 4.9.5, `react-scripts` 5.0.1, `@dfinity/auth-client` 1.3.0을 사용합니다. [React 문서](https://react.dev/)

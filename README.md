## 실행 환경

본 프로젝트는 다음과 같은 프레임워크 혹은 라이브러리 환경에서 실행됩니다.

![js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) - 기존에 사용하던 Vue 프레임워크와 비교하며 공부하기 위해 React를 사용했습니다.<br/>
![js](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) - 타입을 정확히 명시하여 프로젝트의 안정성을 높이기 위해 사용했습니다.<br/>
![js](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) - 컴포넌트 단위의 스타일 적용을 위해 사용했습니다.<br/>
![js](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) - 중앙 집중 상태 관리를 하기 위해 사용했습니다.
<br/>
<br/>
## 실행 하기

`npm i` 이후 `npm run start`
<br/>
<br/>
## Structure

```
client
├── public                          
└── src
    ├── apis                        # api 관련 함수
    ├── assets                      # resoucres
    │   └── Common                  # 공용 styled-component, theme
    │            
    └── Components                  # 컴포넌트      
    ├── constants                   # 상수
    ├── model                       # 객체
    ├── reducer                     # redux
    ├── Routes                      # 페이지
    ├── types                       # 외부 파일 타입 정의
    └── utile                       # 유틸 함수    

```
<br/>
<br/>


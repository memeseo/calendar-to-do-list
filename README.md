## 실행 환경

본 프로젝트는 다음과 같은 프레임워크 혹은 라이브러리 환경에서 실행됩니다.

![js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) - 기존에 사용하던 Vue 프레임워크와 비교하며 공부하기 위해 채용함<br/>
![js](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) - 문법을 제한함으로써 유지보수성을 높이기 위해 채용함<br/>
![js](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) - 태그를 컴포넌트 처럼 사용해 각 태그를 좀더 시맨틱하게 사용하기 위해 채용함<br/>
![js](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) - 기타 환경을 저장해 Experts 리스팅을 하기 위해 채용함
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


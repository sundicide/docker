# R-Coral

## Desc
https://github.com/dphansti/CORAL
에 있는 코드를 웹으로 띄우는 Docker이다.

## install.R을 따로 둔 이유
install.R의 원본 파일에는 관련 라이브러리들이 주석 처리 되어 있어서 이를 설치하기 위해서는 주석을 제거해야 한다.

또한 README에 적힌대로 했을 경우 `rsvg`에서 의존성 에러가 발생한다.
이를 해결하기 위해 Dockerfile내 `librsvg2-dev`를 설치하도록 했다.
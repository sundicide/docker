# config 관련

아래 명령어를 실행하면 자동 생성된다.
```bash
jupyter notebook --generate-config
```

위에서 생성된 파일을 이용해 자주 쓰는 설정들은 파일로 관리해서 사용하면 좋다.

## 추천 옵션
```python
c.NotebookApp.allow_password_change = False

c.NotebookApp.allow_root = True

c.NotebookApp.open_browser = False

c.NotebookApp.port = 8888
```
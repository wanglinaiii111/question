set srcpath=E:\Workspace2017\receipt\question\question-server
set updatepath=E:\Workspace2017\receipt\question


e:
del %updatepath%\question-server.7z

7z a %updatepath%\question-server.7z %srcpath%\* -mx1
C:\Users\zhangw\.ssh\scp -P 22 %updatepath%\question-server.7z root@8.140.105.168:/app/web/question-server.7z
C:\Users\zhangw\.ssh\ssh -p 22 root@8.140.105.168 "cd /app/web/;7z x question-server.7z -y;pm2 reload all "
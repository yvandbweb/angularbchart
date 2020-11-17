# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.
FROM ubuntu:latest

LABEL version="0.1"

RUN apt update

RUN apt install -y nodejs

RUN nodejs -v

RUN apt install -y npm


EXPOSE 80 443 4200

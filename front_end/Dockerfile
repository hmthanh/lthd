FROM node:12.14.0
RUN mkdir front_end
WORKDIR /front_end

COPY ./package*.json /front_end/

RUN npm install -qy

COPY . /front_end


CMD ['sudo npm', 'start']

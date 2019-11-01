 
FROM node:12.0.0
RUN mkdir front_end
WORKDIR /front_end

COPY ./package*.json /front_end/

RUN npm install -qy

COPY . /front_end

# EXPOSE 3000

CMD ['sudo npm', 'start']
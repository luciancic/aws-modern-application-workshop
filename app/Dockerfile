FROM ubuntu:20.04
RUN echo Updating existing packages, installing and upgrading python and pip.
RUN apt-get update -y
RUN apt-get install -y python3-pip python3-dev build-essential
RUN pip3 install --upgrade pip
RUN echo Copying the Mythical Mysfits Flask service into a service directory.
COPY ./service /MythicalMisfitsService
WORKDIR /MythicalMisfitsService
RUN echo Installing python packages from requirements.txt
RUN pip3 install -r requirements.txt
RUN echo Starting flask server
ENTRYPOINT ["python3"]
CMD ["misfitsService.py"]

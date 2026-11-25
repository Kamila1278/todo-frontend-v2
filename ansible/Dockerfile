FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get -o Acquire::Retries=3 update

RUN apt-get -o Acquire::Retries=3 install -y --no-install-recommends \
    openssh-server \
    python3 \
    sudo \
    ansible \
    sshpass \
    curl

RUN mkdir -p /run/sshd \
    && ssh-keygen -A \
    && echo 'root:devops123' | chpasswd \
    && echo 'PermitRootLogin yes' > /etc/ssh/sshd_config.d/99-lab.conf \
    && echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config.d/99-lab.conf

EXPOSE 22 80

CMD ["/usr/sbin/sshd", "-D", "-e"]
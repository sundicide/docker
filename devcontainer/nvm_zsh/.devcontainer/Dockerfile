FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    curl \
    git \
    wget \
    zsh \
    vim \
    build-essential \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m -s $(which zsh) vscode
USER vscode
WORKDIR /home/vscode

ENV NVM_DIR=/home/vscode/.nvm
RUN mkdir -p "$NVM_DIR" \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install Oh My Zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Configure Zsh with NVM
RUN echo 'export NVM_DIR="/home/vscode/.nvm"' >> ~/.zshrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc \
    && echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.zshrc

# Install Node.js using NVM
RUN . "$NVM_DIR/nvm.sh" && nvm install node

# Switch back to root for final setup
USER root
ENV SHELL=/usr/bin/zsh
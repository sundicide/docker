FROM ubuntu

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get -qq update
RUN apt-get clean

RUN apt install -y build-essential curl fonts-powerline git libssl-dev wget vim zsh openssh-server

# Make ZSH the default shell for the current user in the container
# To check that the shell was indeed added: `chsh -l` and you should see it in the  list.
RUN chsh -s $(which zsh)

# Install zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
RUN PATH="$PATH:/usr/bin/zsh"

# Install fish
# RUN apt install -y fish
# RUN curl -L https://get.oh-my.fish > install
# RUN fish install --path=~/.local/share/omf --config=~/.config/omf

# Install NVM
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.25.0/install.sh | bash
RUN echo "export NVM_DIR=~/.nvm" >> ~/.zshrc
RUN echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' >> ~/.zshrc

# Install LTS node using NVM
RUN bin/zsh -c  "source ~/.zshrc && nvm install node; nvm alias default node; npm install -g pm2"
# RUN bin/zsh -c  "source ~/.zshrc && npm install -g pm2"
RUN bin/zsh -c  "source ~/.zshrc; nvm use stable; curl -o- -L https://yarnpkg.com/install.sh | bash"

# ADD script.sh /host_script
#RUN touch /root/.zshrc \
#  && cat host_script >> /root/.zshrc

#######################
#######################
# SSH SETUP
#######################
#######################
RUN mkdir /var/run/sshd

#set password
RUN echo 'root:root' |chpasswd

#replace sshd_config
RUN sed -ri 's/^#?PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -ri 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config

#make .ssh
RUN mkdir /root/.ssh

EXPOSE 22

#CMD tail -f /dev/null
CMD ["/usr/sbin/sshd", "-D"]
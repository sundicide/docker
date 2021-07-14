FROM continuumio/anaconda3

ENV TZ Asia/Seoul

RUN conda config --append channels conda-forge

RUN conda install rdkit

RUN /opt/conda/bin/conda install jupyter -y --quiet && mkdir /opt/notebooks

RUN jupyter notebook --generate-config
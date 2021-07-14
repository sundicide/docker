기본으로 rdkit 관련 output은 docker log에 표현된다.
이를 jupyter notebook에 표현하기 위해서는 아래와 같은 코드를 삽입해줘야 한다.

```python
from rdkit import Chem
from rdkit.Chem.Draw import IPythonConsole
from rdkit.Chem import Draw
IPythonConsole.ipython_useSVG = True  #< set this to False if you want PNGs instead of SVGs
mol = Chem.MolFromSmiles('c1ccccc1')
mol
```
https://www.rdkit.org/docs/Cookbook.html#drawing-molecules-jupyter
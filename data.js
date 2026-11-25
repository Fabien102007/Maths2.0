window.TOPICS = [
{"id":"limits","title":"Limites et convergence","category":"Analyse","level":"L1","chapter":"Analyse — Suites et limites","summary":"Maîtriser la définition ε-N, les limites de suites, les théorèmes de convergence et les limites de fonctions en un point.","definitions":[["Convergence d'une suite","Une suite réelle $(u_n)$ converge vers $\\ell\\in\\mathbb R$ si $\\forall\\varepsilon>0,\\ \\exists N\\in\\mathbb N,\\ \\forall n\\geq N,\\ |u_n-\\ell|<\\varepsilon$. Le rang $N$ dépend de $\\varepsilon$, mais pas de $n$."],["Limite finie d'une fonction","Soit $f$ définie au voisinage de $a$ (éventuellement sauf en $a$). On dit que $f(x)\\to\\ell$ lorsque $x\\to a$ si $\\forall\\varepsilon>0,\\ \\exists\\eta>0$ tel que, pour tout $x$ du domaine de $f$, $0<|x-a|<\\eta\\Rightarrow|f(x)-\\ell|<\\varepsilon$."],["Suite divergente","Une suite est divergente lorsqu'elle ne converge vers aucun réel. Elle peut notamment tendre vers +∞ ou −∞, ou ne posséder aucune limite."],["Suite bornée","Une suite $(u_n)$ est bornée s'il existe $M\\geq0$ tel que $|u_n|\\leq M$ pour tout $n\\in\\mathbb N$."]],"properties":["Somme : si $u_n\\to\\ell$ et $v_n\\to m$, alors $u_n+v_n\\to\\ell+m$.","Produit : si $u_n\\to\\ell$ et $v_n\\to m$, alors $u_nv_n\\to\\ell m$.","Quotient : si $u_n\\to\\ell$, $v_n\\to m\\neq0$ et $v_n\\neq0$ à partir d'un certain rang, alors $u_n/v_n\\to\\ell/m$.","Ordre : si $u_n\\leq v_n$ à partir d'un certain rang et si les deux suites convergent, alors $\\lim u_n\\leq\\lim v_n$.","Théorème des gendarmes : si $u_n\\leq v_n\\leq w_n$ à partir d'un certain rang et si $u_n,w_n\\to\\ell$, alors $v_n\\to\\ell$.","Toute suite convergente est bornée. La réciproque est fausse.","Toute suite croissante et majorée converge ; toute suite décroissante et minorée converge."],"theorems":[{"title":"Unicité de la limite","statement":"Une suite réelle convergente possède une unique limite.","proof":"Supposons que $u_n\\to\\ell$ et $u_n\\to m$. Pour tout $n$, l'inégalité triangulaire donne $|\\ell-m|\\leq|\\ell-u_n|+|u_n-m|$. Les deux termes du membre de droite tendent vers $0$. Ainsi $|\\ell-m|=0$, donc $\\ell=m$."},{"title":"Une suite convergente est bornée","statement":"Si une suite réelle converge, alors elle est bornée.","proof":"Soit $u_n\\to\\ell$. En prenant $\\varepsilon=1$, il existe $N$ tel que $n\\geq N$ implique $|u_n-\\ell|<1$, donc $|u_n|<|\\ell|+1$. Les termes $u_0,\\ldots,u_{N-1}$ sont en nombre fini et possèdent un maximum en valeur absolue. En prenant le maximum de ce nombre et de $|\\ell|+1$, on obtient une borne valable pour toute la suite."},{"title":"Théorème des gendarmes","statement":"Si, à partir d'un certain rang, $u_n\\leq v_n\\leq w_n$ et si $u_n$ et $w_n$ convergent vers le même réel $\\ell$, alors $v_n\\to\\ell$.","proof":"Soit $\\varepsilon>0$. Il existe un rang à partir duquel $\\ell-\\varepsilon<u_n$ et $w_n<\\ell+\\varepsilon$. En combinant avec $u_n\\leq v_n\\leq w_n$, on obtient $\\ell-\\varepsilon<v_n<\\ell+\\varepsilon$, donc $|v_n-\\ell|<\\varepsilon$. C'est exactement la définition de la convergence."},{"title":"Convergence monotone","statement":"Toute suite réelle croissante et majorée converge vers sa borne supérieure. De même, toute suite décroissante et minorée converge.","proof":"Soit $(u_n)$ croissante et majorée. L'ensemble $A=\\{u_n:n\\in\\mathbb N\\}$ est non vide et majoré ; il admet donc une borne supérieure $\\ell=\\sup A$. Pour tout $\\varepsilon>0$, $\\ell-\\varepsilon$ n'est pas un majorant de $A$. Il existe donc $N$ tel que $u_N>\\ell-\\varepsilon$. Pour $n\\geq N$, la croissance donne $u_n\\geq u_N>\\ell-\\varepsilon$, tandis que $u_n\\leq\\ell$. Ainsi $|u_n-\\ell|<\\varepsilon$, donc $u_n\\to\\ell$. Le cas décroissant se déduit en considérant $(-u_n)$."}],"methods":["Pour démontrer $u_n\\to\\ell$ avec la définition : écrire $|u_n-\\ell|$, le simplifier ou le majorer, puis choisir un entier $N$ en fonction de $\\varepsilon$.","Pour une suite définie par récurrence : chercher d'abord un intervalle stable, établir ensuite la monotonie, appliquer le théorème de convergence monotone, puis seulement déterminer la limite par passage à la limite dans la récurrence.","Pour calculer une limite de quotient de polynômes : diviser numérateur et dénominateur par la plus grande puissance de $n$ (après avoir vérifié que le dénominateur ne s'annule pas).","Pour utiliser le théorème des gendarmes : construire deux encadrements qui ont la même limite ; une simple majoration ne suffit pas toujours."],"commonErrors":["Confondre $\\forall\\varepsilon>0\\ \\exists N\\ \\forall n\\geq N$ avec un rang $N$ fixe indépendant de $\\varepsilon$.","Choisir un rang réel au lieu d'un entier, ou oublier de garantir une inégalité stricte.","Passer à la limite dans une récurrence avant d'avoir démontré que la suite converge.","Croire qu'une suite bornée converge : ((−1)^n) est bornée mais divergente.","Appliquer le théorème des gendarmes sans avoir établi les deux inégalités à partir d'un certain rang."],"example":"Pour $u_n=1/n$ (avec $n\\geq1$), soit $\\varepsilon>0$. Choisissons $N=\\lfloor1/\\varepsilon\\rfloor+1$. Pour tout $n\\geq N$, $n>1/\\varepsilon$, donc $|u_n-0|=1/n<\\varepsilon$. Ainsi $u_n\\to0$.","exerciseId":"m4-1","prerequisites":[],"lessonSections":[{"title":"Pourquoi parler de convergence ?","body":"Une suite décrit une quantité qui évolue au fil des entiers : une approximation, une erreur numérique, une population ou encore une suite définie par récurrence. La question centrale est de savoir si ses termes se rapprochent d'une valeur fixe lorsque $n$ devient grand.\n\nLa convergence formalise précisément cette idée de rapprochement. Elle ne demande pas que les termes atteignent la limite : elle demande qu'ils finissent par rester aussi proches qu'on le souhaite."},{"title":"La définition ε-N : traduire « se rapprocher »","body":"Dire que $(u_n)$ converge vers $\\ell$ signifie que, quelle que soit la précision $\\varepsilon>0$ imposée, on peut trouver un rang $N$ à partir duquel tous les termes sont à une distance inférieure à $\\varepsilon$ de $\\ell$.\n\nLa succession des quantificateurs est essentielle : on choisit d'abord $\\varepsilon$, puis on construit $N$ en fonction de cette précision. Une fois $N$ fixé, l'inégalité doit être vraie pour chaque $n\\geq N$.\n\n**Exemple.** Pour $u_n=1/(n+1)$, on veut $1/(n+1)<\\varepsilon$. Il suffit de choisir un entier $N$ tel que $N+1>1/\\varepsilon$. Alors, pour tout $n\\geq N$, on a bien $|u_n-0|<\\varepsilon$. Ainsi $u_n\\\\to0$.","definitions":[0]},{"title":"Calculer avec les limites","body":"Les limites sont compatibles avec les opérations usuelles, à condition de vérifier les hypothèses. Ces règles permettent de transformer une limite compliquée en limites plus simples.\n\nPour un quotient, la limite du dénominateur doit être non nulle. Pour les inégalités, l'ordre doit être vérifié à partir d'un certain rang : quelques premiers termes ne changent pas la limite.","properties":[0,1,2,3,4],"theorem":2},{"title":"Convergence, bornitude et divergence","body":"Une suite convergente ne peut pas s'échapper vers l'infini : ses termes restent dans un intervalle borné. La réciproque est fausse. Être bornée signifie seulement que les termes restent dans une zone fixe, pas qu'ils se rapprochent d'une valeur unique.\n\nL'exemple $u_n=(-1)^n$ est fondamental : ses termes alternent entre $-1$ et $1$. La suite est bornée, mais les termes pairs valent toujours $1$ et les termes impairs toujours $-1$ ; elle ne peut donc pas converger.","properties":[5],"theorem":1},{"title":"Le théorème de convergence monotone","body":"La monotonie fournit un critère puissant : une suite qui avance toujours dans le même sens et qui ne peut pas dépasser une borne converge. L'idée de la preuve repose sur la borne supérieure de l'ensemble des termes.\n\nAttention : la monotonie seule ne suffit pas. Une suite croissante peut tendre vers $+\\infty$ ; il faut aussi une majoration.","properties":[6],"theorem":3},{"title":"La méthode pour les suites récurrentes","body":"Pour étudier une suite définie par $u_{n+1}=f(u_n)$, on ne commence pas par résoudre l'équation $\\ell=f(\\ell)$. Cette équation ne donne qu'une limite éventuelle, si la convergence a déjà été établie.\n\nLa démarche rigoureuse est la suivante : trouver un intervalle stable par $f$, démontrer par récurrence que les termes y restent, étudier le signe de $u_{n+1}-u_n$, puis appliquer le théorème de convergence monotone. Une fois la convergence démontrée, on peut passer à la limite dans la relation de récurrence."},{"title":"Les limites de fonctions : la précision ε-δ","body":"Pour une fonction, le rôle du rang $N$ est joué par une distance $\\delta$ autour du point $a$. Dire que $f(x)$ tend vers $\\ell$ lorsque $x$ tend vers $a$ signifie que l'on peut rendre $f(x)$ aussi proche de $\\ell$ que souhaité en imposant à $x$ d'être suffisamment proche de $a$ (sans nécessairement prendre $x=a$).\n\n**Exemple.** Pour montrer que $x^2\\\\to1$ lorsque $x\\\\to1$, on factorise $|x^2-1|=|x-1||x+1|$. Si $|x-1|<1$, alors $|x+1|<3$. On choisit donc $\\\\delta=\\\\min(1,\\\\varepsilon/3)$ : si $0<|x-1|<\\\\delta$, alors $|x^2-1|<\\\\varepsilon$.","definitions":[1]}]},
{id:"continuity",title:"Continuité",category:"Analyse",level:"L1",chapter:"Analyse — Limites et continuité",summary:"Comprendre quand une fonction transmet les limites, caractériser la continuité et utiliser les grands théorèmes sur un segment.",definitions:[["Continuité en un point","Soit $f$ définie au voisinage de $a$ et en $a$. La fonction $f$ est continue en $a$ si $\\lim_{x\\to a}f(x)=f(a)$. De façon équivalente : $\\forall\\varepsilon>0,\\ \\exists\\delta>0$ tel que $|x-a|<\\delta$ entraîne $|f(x)-f(a)|<\\varepsilon$ pour tout $x$ du domaine."],["Continuité sur un intervalle","Une fonction est continue sur un intervalle $I$ si elle est continue en chacun des points de $I$. Aux extrémités d'un intervalle fermé, on considère la continuité du côté de l'intervalle."],["Prolongement par continuité","Si $f$ est définie sur un voisinage de $a$ privé de $a$ et si $\\lim_{x\\to a}f(x)=\\ell\\in\\mathbb R$, on peut définir $f(a)=\\ell$ pour obtenir une fonction continue en $a$."]],properties:["La somme, le produit et la composée de fonctions continues sont continus sur les ensembles où ces opérations ont un sens.","Si $g$ est continue en $a$ et ne s'annule pas en $a$, alors $1/g$ est continue en $a$ ; le quotient $f/g$ est donc continu lorsque le dénominateur reste non nul.","Les fonctions polynomiales sont continues sur $\\mathbb R$ ; les fonctions rationnelles sont continues sur leur domaine de définition.","La valeur absolue, l'exponentielle, le logarithme et les fonctions trigonométriques sont continues sur leurs domaines respectifs.","L'image d'un intervalle par une fonction continue est un intervalle : elle ne peut pas sauter une valeur intermédiaire."],theorems:[{title:"Caractérisation séquentielle de la continuité",statement:"Une fonction $f$ est continue en $a$ si et seulement si, pour toute suite $(x_n)$ de son domaine qui converge vers $a$, la suite $(f(x_n))$ converge vers $f(a)$.",proof:"Supposons d'abord $f$ continue en $a$. Soit $x_n\\to a$. Pour tout $\\varepsilon>0$, la continuité fournit $\\delta>0$ tel que $|x-a|<\\delta$ implique $|f(x)-f(a)|<\\varepsilon$. À partir d'un certain rang, $|x_n-a|<\\delta$ ; donc $|f(x_n)-f(a)|<\\varepsilon$. Ainsi $f(x_n)\\to f(a)$.\\n\\nRéciproquement, raisonnons par contraposée. Si $f$ n'est pas continue en $a$, il existe $\\varepsilon_0>0$ tel que, pour tout $\\delta>0$, on puisse trouver $x$ dans le domaine avec $|x-a|<\\delta$ et $|f(x)-f(a)|\\geq\\varepsilon_0$. En prenant successivement $\\delta=1/n$, on construit une suite $x_n\\to a$ telle que $|f(x_n)-f(a)|\\geq\\varepsilon_0$ pour tout $n$. La suite $(f(x_n))$ ne converge donc pas vers $f(a)$. La caractérisation est démontrée."},{title:"Théorème des valeurs intermédiaires",statement:"Si $f$ est continue sur $[a,b]$, alors toute valeur $y$ comprise entre $f(a)$ et $f(b)$ est atteinte : il existe $c\\in[a,b]$ tel que $f(c)=y$.",proof:"Supposons, pour fixer les idées, $f(a)<y<f(b)$. Posons $g=f-y$ : $g$ est continue, $g(a)<0$ et $g(b)>0$. Considérons $A=\\{x\\in[a,b]\\mid g(x)\\leq0\\}$ et $c=\\sup A$. L'ensemble $A$ est non vide et majoré, donc $c$ existe. Par la définition du supremum, on peut approcher $c$ par des éléments de $A$ ; la continuité donne alors $g(c)\\leq0$. De plus, aucun point strictement supérieur à $c$ n'appartient à $A$ ; en approchant $c$ par la droite et en utilisant encore la continuité, on obtient $g(c)\\geq0$. Ainsi $g(c)=0$, donc $f(c)=y$. Les cas où $y$ est une valeur aux bornes sont immédiats."},{title:"Théorème des bornes atteintes",statement:"Toute fonction continue sur un segment $[a,b]$ est bornée et atteint son minimum et son maximum sur ce segment.",proof:"Le segment $[a,b]$ est compact. L'image d'un compact par une fonction continue est compacte. Or une partie compacte de $\\mathbb R$ est fermée et bornée ; elle contient donc son infimum et son supremum. Ainsi $f([a,b])$ possède un minimum et un maximum, qui sont atteints en au moins un point de $[a,b]$."}],methods:["Pour vérifier la continuité en $a$, contrôler successivement que $f(a)$ est défini, que la limite $\\lim_{x\\to a}f(x)$ existe, puis qu'elle vaut bien $f(a)$.","Pour une fonction définie par morceaux, étudier séparément les limites à gauche et à droite au point de raccord, puis les comparer à la valeur de la fonction.","Pour établir l'existence d'une solution de $f(x)=y$, repérer un segment sur lequel $f$ est continue et vérifier que $y$ est compris entre les valeurs aux extrémités ; appliquer alors le TVI.","Pour prouver l'unicité d'une solution, compléter le TVI par un argument d'injectivité, souvent obtenu grâce à la stricte monotonie.","Pour montrer qu'une fonction n'est pas continue en $a$, chercher deux limites latérales différentes ou construire une suite $x_n\\to a$ pour laquelle $f(x_n)$ ne tend pas vers $f(a)$."] ,commonErrors:["Confondre l'existence de $\\lim_{x\\to a}f(x)$ avec la continuité : il faut aussi que $f(a)$ soit défini et égal à cette limite.","Appliquer le TVI sans vérifier la continuité sur tout le segment fermé considéré.","Conclure à l'unicité avec le seul TVI : ce théorème garantit une existence, pas une unicité.","Oublier les limites à gauche et à droite pour une fonction définie par morceaux.","Utiliser un quotient comme fonction continue en un point où le dénominateur s'annule."],example:"Considérons $f(x)=\\frac{x^2-1}{x-1}$ pour $x\\neq1$. Pour $x\\neq1$, on simplifie : $f(x)=x+1$. Ainsi $\\lim_{x\\to1}f(x)=2$. La fonction initiale n'est pas définie en $1$ ; en posant $f(1)=2$, on obtient son prolongement par continuité. La discontinuité initiale était donc amovible.",exerciseId:"e2",prerequisites:["limits"],lessonSections:[{title:"De la limite à la continuité : raccorder le comportement à la valeur",body:"Le chapitre sur les limites répondait à une question : que devient $f(x)$ lorsque $x$ se rapproche de $a$ ? La continuité ajoute une exigence : la valeur réellement attribuée à la fonction au point $a$ doit correspondre à ce comportement.\n\nUne fonction peut donc posséder une limite en un point sans être continue en ce point. C'est précisément ce qui se produit lorsqu'on retire un point du graphe, ou lorsqu'on attribue à ce point une valeur différente de la limite." ,definitions:[0]},{title:"La définition ε-δ : contrôler l'écart",body:"La continuité en $a$ signifie que rendre $x$ suffisamment proche de $a$ suffit à rendre $f(x)$ aussi proche que souhaité de $f(a)$. La différence avec la définition d'une limite est essentielle : ici, le point $a$ est inclus dans le contrôle et la cible est exactement $f(a)$.\n\nLe choix de $\\delta$ dépend de la précision $\\varepsilon$. Une fois $\\delta$ choisi, l'implication doit être vraie pour tous les points du domaine qui vérifient $|x-a|<\\delta$.",definitions:[0]},{title:"Les opérations préservent la continuité",body:"Les règles de calcul des limites deviennent des règles de stabilité de la continuité. On peut additionner, multiplier ou composer des fonctions continues. Pour un quotient, il faut toutefois s'assurer que le dénominateur ne s'annule pas au point étudié.\n\nCes résultats expliquent pourquoi les fonctions usuelles sont faciles à traiter : polynômes, fonctions rationnelles sur leur domaine, exponentielle, logarithme et fonctions trigonométriques sont continues là où elles sont définies.",properties:[0,1,2,3],theorem:3},{title:"Tester la continuité avec des suites",body:"La caractérisation séquentielle transforme une question portant sur tous les points proches de $a$ en une question portant sur toutes les suites qui se rapprochent de $a$. Elle est particulièrement utile pour démontrer une discontinuité : une seule suite bien choisie peut suffire à invalider la continuité.\n\nElle fait aussi le lien direct avec le chapitre précédent : la continuité est exactement la propriété qui permet de transmettre la limite d'une suite à travers une fonction.",theorem:0},{title:"Le théorème des valeurs intermédiaires : aucune valeur n'est sautée",body:"Une fonction continue sur un segment ne peut pas passer d'une valeur à une autre en sautant une valeur intermédiaire. Si elle est en dessous de $y$ à une extrémité et au-dessus à l'autre, elle doit prendre la valeur $y$ quelque part entre les deux.\n\nC'est un outil d'existence : il permet notamment de prouver qu'une équation $f(x)=0$ possède au moins une solution. Il ne dit pas, à lui seul, que cette solution est unique.",properties:[4],theorem:1},{title:"Sur un segment, les bornes sont atteintes",body:"La continuité devient encore plus puissante lorsqu'on travaille sur un segment fermé et borné. Le théorème des bornes atteintes garantit qu'une fonction continue y possède un minimum et un maximum : elle ne peut ni devenir arbitrairement grande, ni s'approcher d'une borne qui ne serait jamais atteinte.\n\nLe caractère fermé du segment compte. Sur l'intervalle ouvert $]0,1[$, la fonction $x\\mapsto x$ est continue, mais elle n'atteint ni son infimum $0$ ni son supremum $1$.",theorem:2},{title:"Reconnaître et traiter une discontinuité",body:"Pour une fonction définie par morceaux, le point délicat est généralement le point de raccord. Il faut comparer la limite à gauche, la limite à droite et la valeur de la fonction. Si les deux limites existent mais ne coïncident pas, la fonction n'est pas continue ; si elles coïncident mais que la valeur manque ou diffère, on peut parfois construire un prolongement par continuité.\n\nUne bonne rédaction distingue toujours le calcul de la limite et la conclusion sur la continuité." ,definitions:[1,2]}]},
{id:"derivative",title:"Dérivation",category:"Analyse",level:"L1",chapter:"Analyse",summary:"Mesurer le taux de variation local d'une fonction.",definitions:[["Nombre dérivé","$f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}h$, lorsque cette limite existe."],["Tangente","La tangente au graphe en $(a,f(a))$ a pour équation $y=f(a)+f'(a)(x-a)$."]],properties:["$(u+v)'=u'+v'$.","$(uv)'=u'v+uv'$.","Si $v$ ne s'annule pas, $(u/v)'=(u'v-uv')/v^2$."],example:"Pour $f(x)=x^2$, le taux d'accroissement en $a$ vaut $((a+h)^2-a^2)/h=2a+h$, donc $f'(a)=2a$.",exerciseId:"e3",prerequisites:["limits","continuity"]},
{id:"integrals",title:"Intégration",category:"Analyse",level:"L1",chapter:"Analyse",summary:"Construire une aire algébrique et relier intégrale et primitive.",definitions:[["Intégrale","Pour une fonction continue $f$ sur $[a,b]$, $\\int_a^b f(x)\\,dx$ représente son aire algébrique sous la courbe."],["Primitive","Une primitive de $f$ sur un intervalle est une fonction $F$ dérivable telle que $F'=f$."]],properties:["Relation de Chasles : $\\int_a^b f=\\int_a^c f+\\int_c^b f$.","Théorème fondamental : $\\int_a^b f(x)dx=F(b)-F(a)$."],example:"Comme une primitive de $x^2$ est $x^3/3$, on a $\\int_0^1x^2dx=1/3$.",exerciseId:"e4",prerequisites:["derivative"]},
{id:"series",title:"Séries numériques",category:"Analyse",level:"Prépa",chapter:"Analyse",summary:"Étudier la convergence d'une somme infinie.",definitions:[["Série","La série $\\sum u_n$ converge si la suite des sommes partielles $S_N=\\sum_{n=0}^N u_n$ converge." ]],properties:["La convergence de $\\sum u_n$ implique $u_n\\to0$ (condition nécessaire).","Une série géométrique $\\sum q^n$ converge si et seulement si $|q|<1$."],example:"Pour $|q|<1$, $\\sum_{n=0}^{N}q^n=(1-q^{N+1})/(1-q)\\to1/(1-q)$.",exerciseId:"e5",prerequisites:["limits"]},
{id:"vector-spaces",title:"Espaces vectoriels",category:"Algèbre",level:"L1",chapter:"Algèbre",summary:"Étudier les ensembles munis d'une addition et d'une multiplication scalaire.",definitions:[["Sous-espace vectoriel","Une partie $F$ d'un espace vectoriel $E$ est un sous-espace si elle est non vide, stable par combinaison linéaire : $\\forall x,y\\in F,\\forall\\lambda,\\mu,\\lambda x+\\mu y\\in F$."]],properties:["Une intersection de sous-espaces est un sous-espace.","L'ensemble des solutions d'un système linéaire homogène est un sous-espace."],example:"Dans $\\mathbb R^2$, la droite $F=\\{(x,2x):x\\in\\mathbb R\\}$ est le sous-espace engendré par $(1,2)$.",exerciseId:"e6",prerequisites:[]},
{id:"basis",title:"Bases et dimension",category:"Algèbre",level:"L1",chapter:"Algèbre",summary:"Décrire un espace à l'aide d'une famille libre et génératrice.",definitions:[["Base","Une famille est une base si elle est libre et génératrice."],["Dimension","La dimension d'un espace de dimension finie est le nombre de vecteurs d'une base."]],properties:["Dans un espace de dimension $n$, toute famille libre de $n$ vecteurs est une base.","Toute famille génératrice de $n$ vecteurs est une base."],example:"La famille canonique $\\left(\\binom{1}{0},\\binom{0}{1}\\right)$ est une base de $\\mathbb R^2$, donc sa dimension vaut 2.",exerciseId:"e7",prerequisites:["vector-spaces"]},
{id:"linear-maps",title:"Applications linéaires",category:"Algèbre",level:"L1",chapter:"Algèbre",summary:"Étudier les transformations qui préservent les combinaisons linéaires.",definitions:[["Linéarité","$f:E\\to F$ est linéaire si $f(\\lambda x+\\mu y)=\\lambda f(x)+\\mu f(y)$."]],properties:["Une application linéaire est entièrement déterminée par l'image d'une base.","Le noyau et l'image sont des sous-espaces vectoriels."],example:"L'application $f(x,y)=(2x-y,x+3y)$ est linéaire.",exerciseId:"e8",prerequisites:["vector-spaces","basis"]},
{id:"matrices",title:"Matrices et déterminants",category:"Algèbre",level:"L1",chapter:"Algèbre",summary:"Représenter les applications linéaires et tester l'inversibilité.",definitions:[["Déterminant en dimension 2","Pour $A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$, $\\det(A)=ad-bc$."]],properties:["Une matrice carrée est inversible si et seulement si son déterminant est non nul.","$\\det(AB)=\\det(A)\\det(B)$."],example:"Pour $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$, $\\det(A)=4-6=-2$, donc $A$ est inversible.",exerciseId:"e9",prerequisites:["linear-maps"]},
{id:"eigenvalues",title:"Valeurs propres",category:"Algèbre",level:"Prépa",chapter:"Algèbre",summary:"Identifier les directions invariantes d'un endomorphisme.",definitions:[["Valeur propre","$\\lambda$ est valeur propre de $u$ s'il existe $x\\ne0$ tel que $u(x)=\\lambda x$."]],properties:["Les valeurs propres sont les racines du polynôme caractéristique.","Des vecteurs propres associés à des valeurs propres distinctes sont linéairement indépendants."],example:"Une matrice diagonale a pour valeurs propres ses coefficients diagonaux.",exerciseId:"e10",prerequisites:["linear-maps","matrices"]}
];

window.EXERCISES = [
  {
    "id": "m4-1",
    "topic": "limits",
    "category": "Analyse",
    "difficulty": "Facile",
    "title": "Limites et convergence — Facile · Exercice 01",
    "question": "Étudier la limite de \\(u_n=\\frac{3}{n+2}\\).",
    "hints": [
      "Comparer |uₙ| à ε et choisir N adapté."
    ],
    "answer": "Pour ε>0, choisir N>3/ε. Pour n≥N, 0≤3/(n+2)<ε, donc uₙ→0.",
    "solutionSteps": ["**1. Identifier la limite candidate.** Le numérateur vaut $3$ et le dénominateur $n+2$ tend vers $+\\infty$. La limite attendue est donc $0$. Il faut maintenant le démontrer avec la définition de la convergence.","**2. Partir de la définition.** On doit montrer que, pour tout $\\varepsilon>0$, il existe $N\\in\\mathbb N$ tel que, pour tout $n\\geq N$, on ait $|u_n-0|<\\varepsilon$. Or, pour tout $n\\in\\mathbb N$, $u_n=\\frac{3}{n+2}>0$, donc $|u_n|=\\frac{3}{n+2}$.","**3. Choisir $N$.** L'inégalité $\\frac{3}{n+2}<\\varepsilon$ est équivalente à $n+2>\\frac{3}{\\varepsilon}$. Pour un $\\varepsilon>0$ fixé, on peut choisir $N=\\lfloor 3/\\varepsilon\\rfloor+1$. Alors $n\\geq N$ implique $n+2>3/\\varepsilon$, donc $\\frac{3}{n+2}<\\varepsilon$.","**Conclusion.** La définition est vérifiée pour tout $\\varepsilon>0$. Ainsi, $\\boxed{u_n\\longrightarrow 0}$."],
    "check": "Point de vigilance : le choix de N dépend de ε, mais pas de n. Il faut aussi conserver le sens strict de l'inégalité."
  },
  {
    "id": "m4-2",
    "topic": "limits",
    "category": "Analyse",
    "difficulty": "Intermédiaire",
    "title": "Limites et convergence — Intermédiaire · Exercice 02",
    "question": "Montrer que la suite \\(\\left(u_n\\right)\\) définie par \\(u_n=\\frac{2n+1}{n+3}\\) converge et déterminer sa limite.",
    "hints": [
      "Diviser le numérateur et le dénominateur par n."
    ],
    "answer": "uₙ=(2+1/n)/(1+3/n)→2.",
    "solutionSteps": ["**1. Transformer l'expression.** On cherche une limite finie. En divisant le numérateur et le dénominateur par $n$, on obtient, pour $n\\geq1$, $u_n=\\frac{2+1/n}{1+3/n}$. Comme $1/n\\to0$, cette écriture suggère la limite $2$.","**2. Établir la convergence.** Pour une démonstration directe, calculons l'écart à $2$ : $\\displaystyle u_n-2=\\frac{2n+1}{n+3}-2=\\frac{2n+1-2n-6}{n+3}=-\\frac{5}{n+3}$. Par conséquent, $\\displaystyle |u_n-2|=\\frac{5}{n+3}$.","**3. Vérifier la définition.** Soit $\\varepsilon>0$. Choisissons $N=\\lfloor 5/\\varepsilon\\rfloor+1$. Pour tout $n\\geq N$, on a $n+3>5/\\varepsilon$, donc $\\displaystyle |u_n-2|=\\frac{5}{n+3}<\\varepsilon$.","**Conclusion.** La suite converge et sa limite est $\\boxed{2}$."],
    "check": "Point de vigilance : diviser par n permet de conjecturer la limite, mais le calcul de |u_n−2| donne une preuve directe et contrôle l'écart."
  },
  {
    "id": "m4-3",
    "topic": "limits",
    "category": "Analyse",
    "difficulty": "Avancé",
    "title": "Limites et convergence — Avancé · Exercice 03",
    "question": "Soit \\((u_n)\\) définie par \\(u_0=0\\) et \\(u_{n+1}=\\sqrt{2+u_n}\\). Montrer que \\((u_n)\\) converge et calculer sa limite.",
    "hints": [
      "Utiliser l'encadrement 0≤uₙ≤2, puis montrer que la suite est croissante."
    ],
    "answer": "**1. Invariance d'un intervalle.** On montre par récurrence que $0\\leq u_n\\leq 2$. C'est vrai pour $n=0$. Si $0\\leq u_n\\leq2$, alors $2\\leq2+u_n\\leq4$, donc $0\\leq u_{n+1}=\\sqrt{2+u_n}\\leq2$. La propriété est établie pour tout $n$.\n\n**2. Monotonie.** Pour $x\\in[0,2]$, les deux membres étant positifs, $\\sqrt{2+x}\\geq x$ équivaut à $2+x\\geq x^2$, soit $(2-x)(x+1)\\geq0$. Ainsi $u_{n+1}\\geq u_n$. La suite est croissante et majorée par $2$ ; le théorème de convergence monotone assure l'existence de $\\ell\\in[0,2]$ tel que $u_n\\to\\ell$.\n\n**3. Détermination de la limite.** La fonction racine carrée est continue sur $[0,+\\infty[$. En passant à la limite dans la relation de récurrence, $\\ell=\\sqrt{2+\\ell}$. En élevant au carré, $\\ell^2-\\ell-2=0$, donc $(\\ell-2)(\\ell+1)=0$. Comme $\\ell\\geq0$, on obtient $\\boxed{\\ell=2}$.",
    "solutionSteps": ["**1. Montrer que la suite reste dans [0,2].** On raisonne par récurrence. Initialement, $u_0=0\\in[0,2]$. Supposons $0\\leq u_n\\leq2$. Alors $2\\leq2+u_n\\leq4$, donc $0\\leq u_{n+1}=\\sqrt{2+u_n}\\leq2$. Ainsi, pour tout $n$, $0\\leq u_n\\leq2$.","**2. Montrer que la suite est croissante.** Pour $x\\in[0,2]$, les deux nombres $x$ et $\\sqrt{2+x}$ sont positifs. On peut donc comparer leurs carrés : $\\sqrt{2+x}\\geq x$ équivaut à $2+x\\geq x^2$, soit $(2-x)(x+1)\\geq0$. Cette dernière inégalité est vraie sur $[0,2]$. En prenant $x=u_n$, on obtient $u_{n+1}\\geq u_n$.","**3. Conclure à la convergence.** La suite est croissante et majorée par $2$. D'après le théorème de convergence des suites monotones, elle converge vers une limite $\\ell\\in[0,2]$.","**4. Déterminer la limite.** La fonction $x\\mapsto\\sqrt{2+x}$ est continue sur $[0,2]$. On peut donc passer à la limite dans la relation $u_{n+1}=\\sqrt{2+u_n}$ : $\\ell=\\sqrt{2+\\ell}$. En élevant au carré, $\\ell^2-\\ell-2=0$, donc $(\\ell-2)(\\ell+1)=0$. Les solutions sont $2$ et $-1$ ; comme $\\ell\\in[0,2]$, seule la valeur $2$ convient.","**Conclusion.** $\\boxed{u_n\\longrightarrow2}$."],
    "check": "Point de vigilance : on ne peut pas invoquer le théorème de convergence monotone sans avoir prouvé à la fois la monotonie et une borne."
  },
  {
    "id": "m4-4",
    "topic": "continuity",
    "category": "Analyse",
    "difficulty": "Facile",
    "title": "Continuité — Facile · Exercice 04",
    "question": "Montrer que la fonction \\(f:\\mathbb R\\to\\mathbb R\\), définie par \\(f(x)=3x-2\\), est continue sur \\(\\mathbb R\\).",
    "hints": [
      "Les fonctions affines sont continues."
    ],
    "answer": "f est affine, donc continue sur ℝ.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-5",
    "topic": "continuity",
    "category": "Analyse",
    "difficulty": "Intermédiaire",
    "title": "Continuité — Intermédiaire · Exercice 05",
    "question": "Montrer que la fonction \\(x\\mapsto |x|\\) est continue en \\(0\\).",
    "hints": [
      "Utiliser ||x|−|0||=|x|."
    ],
    "answer": "|f(x)−f(0)|=|x|→0.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-6",
    "topic": "continuity",
    "category": "Analyse",
    "difficulty": "Avancé",
    "title": "Continuité — Avancé · Exercice 06",
    "question": "Soient \\(f\\) et \\(g\\) continues en \\(a\\). Démontrer, directement avec la définition \\(\\varepsilon\\)-\\(\\delta\\), que \\(fg\\) est continue en \\(a\\).",
    "hints": [
      "Utiliser la règle sur la limite d'un produit."
    ],
    "answer": "Posons $A=f(a)$ et $B=g(a)$. Soit $\\varepsilon>0$.\n\n**1. Obtenir une borne locale de $f$.** Par continuité de $f$ en $a$, il existe $\\delta_0>0$ tel que $|x-a|<\\delta_0$ entraîne $|f(x)-A|<1$. Ainsi, dans ce voisinage, $|f(x)|\\leq |A|+1=:M$.\n\n**2. Décomposer l'écart.** On écrit\n\\[\nf(x)g(x)-AB=f(x)(g(x)-B)+B(f(x)-A).\n\\]\nPour $|x-a|<\\delta_0$, l'inégalité triangulaire donne\n\\[\n|f(x)g(x)-AB|\\leq M|g(x)-B|+|B||f(x)-A|.\n\\]\n\n**3. Choisir les paramètres.** La continuité de $g$ fournit $\\delta_1>0$ tel que $|x-a|<\\delta_1$ implique $|g(x)-B|<\\varepsilon/(2(M+1))$. Celle de $f$ fournit $\\delta_2>0$ tel que $|x-a|<\\delta_2$ implique $|f(x)-A|<\\varepsilon/(2(|B|+1))$.\n\nPrenons $\\delta=\\min(\\delta_0,\\delta_1,\\delta_2)$. Si $|x-a|<\\delta$, alors\n\\[\n|f(x)g(x)-AB|<\\frac{M\\varepsilon}{2(M+1)}+\\frac{|B|\\varepsilon}{2(|B|+1)}<\\varepsilon.\n\\]\nLa définition $\\varepsilon$-$\\delta$ est vérifiée : $fg$ est continue en $a$.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-7",
    "topic": "derivative",
    "category": "Analyse",
    "difficulty": "Facile",
    "title": "Dérivation — Facile · Exercice 07",
    "question": "Calculer la dérivée de la fonction \\(f(x)=x^3-2x\\).",
    "hints": [
      "Appliquer les règles usuelles."
    ],
    "answer": "f′(x)=3x²−2.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-8",
    "topic": "derivative",
    "category": "Analyse",
    "difficulty": "Intermédiaire",
    "title": "Dérivation — Intermédiaire · Exercice 08",
    "question": "Déterminer une équation de la tangente à la courbe \\(y=x^2\\) au point d'abscisse \\(x=2\\).",
    "hints": [
      "Calculer f(2) et f′(2)."
    ],
    "answer": "f(2)=4 et f′(2)=4 ; y=4+4(x−2)=4x−4.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-9",
    "topic": "derivative",
    "category": "Analyse",
    "difficulty": "Avancé",
    "title": "Dérivation — Avancé · Exercice 09",
    "question": "Étudier complètement les variations de \\(f(x)=x^3-3x\\) sur \\(\\mathbb R\\), puis déterminer son image.",
    "hints": [
      "Étudier le signe de la dérivée."
    ],
    "answer": "**1. Régularité et dérivée.** $f$ est un polynôme, donc dérivable sur $\\mathbb R$. On a\n\\[\nf'(x)=3x^2-3=3(x-1)(x+1).\n\\]\n\n**2. Signe de $f'$.** Le produit est positif pour $x<-1$ et $x>1$, négatif pour $-1<x<1$, et nul en $-1$ et $1$. Par le théorème de monotonie, $f$ est croissante sur $]-\\infty,-1]$, décroissante sur $[-1,1]$, puis croissante sur $[1,+\\infty[$.\n\n**3. Valeurs et limites.** $f(-1)=2$ et $f(1)=-2$. Comme $f(x)=x^3(1-3/x^2)$ lorsque $x\\ne0$, le terme dominant donne\n\\[\n\\lim_{x\\to-\\infty}f(x)=-\\infty,\\qquad \\lim_{x\\to+\\infty}f(x)=+\\infty.\n\\]\n\n**4. Image.** La fonction est continue sur $\\mathbb R$. Sur $[1,+\\infty[$, elle prend toutes les valeurs de $-2$ à $+\\infty$ ; sur $]-\\infty,-1]$, elle prend toutes les valeurs de $-\\infty$ à $2$. Par conséquent $\\boxed{f(\\mathbb R)=\\mathbb R}$. Les points $(-1,2)$ et $(1,-2)$ sont respectivement un maximum local et un minimum local.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-10",
    "topic": "derivative",
    "category": "Analyse",
    "difficulty": "Facile",
    "title": "Dérivation — Facile · Exercice 10",
    "question": "Donner une constante \\(M\\) telle que \\(|(\\sin x)'|\\leq M\\) pour tout \\(x\\in\\mathbb R\\).",
    "hints": [
      "Rappeler la borne de cosinus."
    ],
    "answer": "|(sin x)′|=|cos x|≤1 ; M=1.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-11",
    "topic": "derivative",
    "category": "Analyse",
    "difficulty": "Intermédiaire",
    "title": "Dérivation — Intermédiaire · Exercice 11",
    "question": "Montrer que \\(|e^b-e^a|\\leq e^b(b-a)\\) pour tous \\(0\\leq a\\leq b\\).",
    "hints": [
      "Appliquer le TAF à exp."
    ],
    "answer": "Il existe c∈]a,b[ : eᵇ−eᵃ=eᶜ(b−a)≤eᵇ(b−a).",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-12",
    "topic": "derivative",
    "category": "Analyse",
    "difficulty": "Avancé",
    "title": "Dérivation — Avancé · Exercice 12",
    "question": "Démontrer que la fonction \\(f(x)=\\sqrt{1+x^2}\\) est \\(1\\)-lipschitzienne sur \\(\\mathbb R\\).",
    "hints": [
      "Calculer f′ et majorer sa valeur absolue."
    ],
    "answer": "Soient $x,y\\in\\mathbb R$. On rationalise la différence :\n\\[\n|f(x)-f(y)|=\\frac{|x^2-y^2|}{\\sqrt{1+x^2}+\\sqrt{1+y^2}}\n=|x-y|\\frac{|x+y|}{\\sqrt{1+x^2}+\\sqrt{1+y^2}}.\n\\]\nPour tout réel $t$, on a $|t|\\leq\\sqrt{1+t^2}$. Ainsi,\n\\[\n|x+y|\\leq |x|+|y|\\leq\\sqrt{1+x^2}+\\sqrt{1+y^2}.\n\\]\nLe quotient précédent est donc inférieur ou égal à $1$, et\n\\[\n\\boxed{|f(x)-f(y)|\\leq|x-y|}.\n\\]\nLa fonction est donc $1$-lipschitzienne.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-13",
    "topic": "continuity",
    "category": "Analyse",
    "difficulty": "Facile",
    "title": "Continuité — Facile · Exercice 13",
    "question": "Montrer que l'équation \\(x^3+x-1=0\\) possède une solution dans \\([0,1]\\).",
    "hints": [
      "Évaluer aux bornes."
    ],
    "answer": "g(0)=−1, g(1)=1 et g est continue ; le TVI s'applique.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-14",
    "topic": "integrals",
    "category": "Analyse",
    "difficulty": "Facile",
    "title": "Intégration — Facile · Exercice 14",
    "question": "Calculer \\(\\displaystyle\\int_0^2 2x\\,dx\\).",
    "hints": [
      "Chercher une primitive."
    ],
    "answer": "[x²]₀²=4.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-15",
    "topic": "integrals",
    "category": "Analyse",
    "difficulty": "Intermédiaire",
    "title": "Intégration — Intermédiaire · Exercice 15",
    "question": "Calculer \\(\\displaystyle\\int_0^1(3x^2+2x)\\,dx\\).",
    "hints": [
      "Intégrer chaque monôme."
    ],
    "answer": "[x³+x²]₀¹=2.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-16",
    "topic": "integrals",
    "category": "Analyse",
    "difficulty": "Avancé",
    "title": "Intégration — Avancé · Exercice 16",
    "question": "Soient \\(u,v\\in C^1([a,b])\\). Établir la formule d'intégration par parties et l'utiliser pour calculer \\(\\displaystyle\\int_0^1 xe^x\\,dx\\).",
    "hints": [
      "Intégrer la dérivée du produit uv."
    ],
    "answer": "**1. Démonstration de la formule.** Comme $u$ et $v$ sont de classe $C^1$, le produit $uv$ l'est aussi et $(uv)'=u'v+uv'$. En intégrant sur $[a,b]$ et en appliquant le théorème fondamental de l'analyse,\n\\[\nu(b)v(b)-u(a)v(a)=\\int_a^b u'(x)v(x)\\,dx+\\int_a^b u(x)v'(x)\\,dx.\n\\]\nOn isole le second terme :\n\\[\n\\boxed{\\int_a^b uv'=[uv]_a^b-\\int_a^b u'v}.\n\\]\n\n**2. Application.** Pour $I=\\int_0^1xe^x\\,dx$, choisissons $u(x)=x$ et $v'(x)=e^x$. Alors $u'(x)=1$ et $v(x)=e^x$. Donc\n\\[\nI=[xe^x]_0^1-\\int_0^1e^x\\,dx=e-(e-1)=\\boxed{1}.\n\\]",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-17",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Facile",
    "title": "Espaces vectoriels — Facile · Exercice 17",
    "question": "Les couples \\((x,0)\\), avec \\(x\\in\\mathbb R\\), forment-ils un sous-espace vectoriel de \\(\\mathbb R^2\\) ?",
    "hints": [
      "Vérifier non-vacuité et stabilité."
    ],
    "answer": "Oui : (0,0)∈F et λ(x,0)+μ(y,0)=(λx+μy,0)∈F.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-18",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Intermédiaire",
    "title": "Espaces vectoriels — Intermédiaire · Exercice 18",
    "question": "Montrer que l'ensemble des \\((x,y,z)\\in\\mathbb R^3\\) vérifiant \\(x-2y+z=0\\) définit un sous-espace vectoriel de \\(\\mathbb R^3\\).",
    "hints": [
      "Reconnaître le noyau d'une forme linéaire."
    ],
    "answer": "C'est Ker(φ), φ(x,y,z)=x−2y+z linéaire ; son noyau est un sous-espace.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-19",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Facile",
    "title": "Espaces vectoriels — Facile · Exercice 19",
    "question": "La famille \\(\\left(\\binom{1}{0},\\binom{0}{1}\\right)\\) est-elle libre dans \\(\\mathbb R^2\\) ?",
    "hints": [
      "Écrire une combinaison linéaire nulle."
    ],
    "answer": "λ(1,0)+μ(0,1)=0 impose λ=μ=0.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-20",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Intermédiaire",
    "title": "Espaces vectoriels — Intermédiaire · Exercice 20",
    "question": "La famille \\(\\left(\\binom{1}{1},\\binom{2}{2}\\right)\\) est-elle libre dans \\(\\mathbb R^2\\) ?",
    "hints": [
      "Chercher une relation non triviale."
    ],
    "answer": "(2,2)=2(1,1), donc la famille est liée.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-21",
    "topic": "linear-maps",
    "category": "Algèbre",
    "difficulty": "Facile",
    "title": "Applications linéaires — Facile · Exercice 21",
    "question": "Montrer que l'application \\(f:\\mathbb R^2\\to\\mathbb R^2\\), définie par \\(f(x,y)=(2x,2y)\\), est linéaire.",
    "hints": [
      "Vérifier la combinaison linéaire."
    ],
    "answer": "f(λu+μv)=2λu+2μv=λf(u)+μf(v).",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-22",
    "topic": "linear-maps",
    "category": "Algèbre",
    "difficulty": "Intermédiaire",
    "title": "Applications linéaires — Intermédiaire · Exercice 22",
    "question": "Déterminer le noyau de l'application \\(f:\\mathbb R^2\\to\\mathbb R^2\\), définie par \\(f(x,y)=(x+y,x-y)\\).",
    "hints": [
      "Résoudre f(x,y)=(0,0)."
    ],
    "answer": "x+y=0 et x−y=0 donnent x=y=0 ; Ker(f)={(0,0)}.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-23",
    "topic": "matrices",
    "category": "Algèbre",
    "difficulty": "Facile",
    "title": "Matrices et déterminants — Facile · Exercice 23",
    "question": "Calculer \\(\\det\\begin{pmatrix}3&1\\\\2&4\\end{pmatrix}\\).",
    "hints": [
      "Appliquer ad−bc."
    ],
    "answer": "3×4−1×2=10.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-24",
    "topic": "matrices",
    "category": "Algèbre",
    "difficulty": "Avancé",
    "title": "Matrices et déterminants — Avancé · Exercice 24",
    "question": "Soient \\(u,v\\in\\mathbb R^2\\). Démontrer que \\(u\\) et \\(v\\) sont liés si et seulement si \\(\\det(u,v)=0\\).",
    "hints": [
      "Interpréter le déterminant comme aire orientée."
    ],
    "answer": "Écrivons $u=(a,c)$ et $v=(b,d)$.\n\n**Sens direct.** Si $u$ et $v$ sont liés, l'un est multiple de l'autre (ou l'un est nul). Le déterminant est alors nul par alternance et linéarité : $\\det(u,v)=0$.\n\n**Réciproque.** Supposons $ad-bc=0$. Si $u=0$, la famille est immédiatement liée. Sinon, au moins une coordonnée de $u$ est non nulle.\n- Si $a\\ne0$, l'égalité $ad-bc=0$ donne $d=bc/a$. Ainsi $v=(b/a)(a,c)=(b/a)u$.\n- Si $a=0$, alors $c\\ne0$ et $-bc=0$, donc $b=0$. On a alors $v=(0,d)=(d/c)u$.\n\nDans tous les cas, $v$ est colinéaire à $u$. Donc la famille $(u,v)$ est liée. Finalement,\n\\[\n\\boxed{u,v\\text{ liés}\\iff\\det(u,v)=0}.\n\\]",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-25",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Intermédiaire",
    "title": "Espaces vectoriels — Intermédiaire · Exercice 25",
    "question": "Montrer que les deux axes de coordonnées de \\(\\mathbb R^2\\) sont supplémentaires.",
    "hints": [
      "Vérifier somme égale à ℝ² et intersection nulle."
    ],
    "answer": "Tout (x,y)=(x,0)+(0,y), et l'intersection des axes vaut {(0,0)}.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-26",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Facile",
    "title": "Espaces vectoriels — Facile · Exercice 26",
    "question": "Calculer le produit scalaire usuel des vecteurs \\(\\begin{pmatrix}1\\\\2\\end{pmatrix}\\) et \\(\\begin{pmatrix}3\\\\-1\\end{pmatrix}\\) de \\(\\mathbb R^2\\).",
    "hints": [
      "Multiplier les coordonnées puis additionner."
    ],
    "answer": "1×3+2×(−1)=1.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-27",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Intermédiaire",
    "title": "Espaces vectoriels — Intermédiaire · Exercice 27",
    "question": "Vérifier que les vecteurs \\(\\begin{pmatrix}1\\\\1\\end{pmatrix}\\) et \\(\\begin{pmatrix}1\\\\-1\\end{pmatrix}\\) sont orthogonaux, puis appliquer le théorème de Pythagore.",
    "hints": [
      "Calculer le produit scalaire et les normes."
    ],
    "answer": "Le produit scalaire vaut 0 ; ‖(2,0)‖²=2+2=4.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-28",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Avancé",
    "title": "Espaces vectoriels — Avancé · Exercice 28",
    "question": "Dans un espace préhilbertien réel, démontrer l'inégalité de Cauchy-Schwarz et caractériser le cas d'égalité.",
    "hints": [
      "Choisir t=⟨x,y⟩/‖y‖² et développer."
    ],
    "answer": "Si $y=0$, l'inégalité est immédiate. Supposons $y\\ne0$. Pour tout $t\\in\\mathbb R$, la positivité de la norme donne\n\\[\n0\\leq\\|x-ty\\|^2=\\|x\\|^2-2t\\langle x,y\\rangle+t^2\\|y\\|^2.\n\\]\nChoisissons $t=\\langle x,y\\rangle/\\|y\\|^2$. On obtient\n\\[\n0\\leq\\|x\\|^2-\\frac{\\langle x,y\\rangle^2}{\\|y\\|^2}.\n\\]\nEn multipliant par $\\|y\\|^2>0$ : $\\langle x,y\\rangle^2\\leq\\|x\\|^2\\|y\\|^2$, donc\n\\[\n\\boxed{|\\langle x,y\\rangle|\\leq\\|x\\|\\,\\|y\\|}.\n\\]\n**Cas d'égalité.** L'égalité a lieu exactement lorsque le minimum du trinôme $t\\mapsto\\|x-ty\\|^2$ est nul, c'est-à-dire lorsqu'il existe $t$ tel que $x=ty$. Ainsi égalité si et seulement si $x$ et $y$ sont liés (ce qui inclut le cas où l'un est nul).",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-29",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Facile",
    "title": "Espaces vectoriels — Facile · Exercice 29",
    "question": "Projeter le vecteur \\(v_2=(2,1)\\) sur le vecteur \\(u_1=(1,0)\\).",
    "hints": [
      "Utiliser la formule de projection."
    ],
    "answer": "projᵤ₁(v₂)=2(1,0)=(2,0).",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-30",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Intermédiaire",
    "title": "Espaces vectoriels — Intermédiaire · Exercice 30",
    "question": "Appliquer l'algorithme de Gram-Schmidt à \\(v_1=(1,0)\\) et \\(v_2=(1,2)\\).",
    "hints": [
      "Soustraire la projection de v₂ sur v₁."
    ],
    "answer": "w₂=(0,2), puis le vecteur normalisé est (0,1).",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-31",
    "topic": "series",
    "category": "Analyse",
    "difficulty": "Intermédiaire",
    "title": "Séries numériques — Intermédiaire · Exercice 31",
    "question": "Quelle est la période de la fonction \\(x\\mapsto\\cos(4x)\\) ?",
    "hints": [
      "La période de cos(kx) vaut 2π/|k|."
    ],
    "answer": "La période fondamentale est π/2.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-32",
    "topic": "derivative",
    "category": "Analyse",
    "difficulty": "Facile",
    "title": "Dérivation — Facile · Exercice 32",
    "question": "Donner le développement limité de \\(e^x\\) à l'ordre \\(2\\) au voisinage de \\(0\\).",
    "hints": [
      "Écrire les termes jusqu'à x² et le reste."
    ],
    "answer": "eˣ=1+x+x²/2+o(x²).",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-33",
    "topic": "derivative",
    "category": "Analyse",
    "difficulty": "Avancé",
    "title": "Dérivation — Avancé · Exercice 33",
    "question": "À l'aide d'un développement limité, déterminer un équivalent de \\(\\ln(1+x)-x\\) lorsque \\(x\\to0\\).",
    "hints": [
      "Conserver le premier terme non nul du DL."
    ],
    "answer": "Au voisinage de $0$, on dispose du développement limité à l'ordre $2$ :\n\\[\n\\ln(1+x)=x-\\frac{x^2}{2}+o(x^2).\n\\]\nEn soustrayant $x$ des deux côtés,\n\\[\n\\ln(1+x)-x=-\\frac{x^2}{2}+o(x^2)\n=-\\frac{x^2}{2}\\left(1+o(1)\\right).\n\\]\nComme $-1/2\\ne0$, le facteur entre parenthèses tend vers $1$. Par définition d'un équivalent,\n\\[\n\\boxed{\\ln(1+x)-x\\sim-\\frac{x^2}{2}\\quad(x\\to0)}.\n\\]",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-34",
    "topic": "eigenvalues",
    "category": "Algèbre",
    "difficulty": "Intermédiaire",
    "title": "Valeurs propres — Intermédiaire · Exercice 34",
    "question": "Diagonaliser \\(A=\\operatorname{diag}(2,3)\\) et donner une base de vecteurs propres.",
    "hints": [
      "Une matrice diagonale est déjà écrite dans sa base propre."
    ],
    "answer": "A est diagonale dans la base canonique ; e₁ et e₂ sont vecteurs propres associés à 2 et 3.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-35",
    "topic": "continuity",
    "category": "Analyse",
    "difficulty": "Facile",
    "title": "Continuité — Facile · Exercice 35",
    "question": "L'intervalle \\([0,1]\\) est-il compact dans \\(\\mathbb R\\) ? Justifier.",
    "hints": [
      "Utiliser le critère de Heine-Borel dans ℝ."
    ],
    "answer": "Oui : [0,1] est fermé et borné, donc compact.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-36",
    "topic": "multivariable",
    "category": "Analyse",
    "difficulty": "Intermédiaire",
    "title": "Fonctions de plusieurs variables — Ligne de niveau",
    "question": "Décrire la ligne de niveau de valeur 1 de $f(x,y)=x^2+y^2$.",
    "hints": ["Écris l'équation $f(x,y)=1$.", "Reconnais l'équation cartésienne d'un cercle."],
    "answer": "La ligne de niveau est définie par $x^2+y^2=1$. C'est le cercle de centre $(0,0)$ et de rayon 1.",
    "solutionSteps": ["Par définition, la ligne de niveau de valeur 1 est l'ensemble des points $(x,y)$ tels que $f(x,y)=1$.", "En remplaçant $f(x,y)$ par son expression, on obtient $x^2+y^2=1$.", "Cette équation est celle du cercle unité, de centre $(0,0)$ et de rayon 1."],
    "check": "Vérifie la définition d'une ligne de niveau puis identifie la courbe obtenue.",
    "level": "L2"
  },
  {
    "id": "m4-37",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Intermédiaire",
    "title": "Espaces vectoriels — Intermédiaire · Exercice 37",
    "question": "Déterminer la dimension de \\(H=\\{(x,y,z)\\in\\mathbb R^3\\mid x-y+2z=0\\}\\).",
    "hints": [
      "C'est le noyau d'une forme linéaire non nulle sur ℝ³."
    ],
    "answer": "La forme linéaire est non nulle, donc son noyau est un hyperplan de dimension 3−1=2.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-38",
    "topic": "integrals",
    "category": "Analyse",
    "difficulty": "Avancé",
    "title": "Intégration — Avancé · Exercice 38",
    "question": "Pour \\(p\\in\\mathbb R\\), étudier la nature de l'intégrale impropre \\(\\displaystyle\\int_1^{+\\infty}\\frac{dx}{x^p}\\).",
    "hints": [
      "Calculer une primitive si p≠1, puis traiter p=1 séparément."
    ],
    "answer": "On étudie la limite de $I(A)=\\int_1^A x^{-p}\\,dx$ lorsque $A\\to+\\infty$.\n\n**Cas 1 : $p\\ne1$.** Une primitive est $x^{1-p}/(1-p)$, donc\n\\[\nI(A)=\\frac{A^{1-p}-1}{1-p}.\n\\]\n- Si $p>1$, alors $1-p<0$ et $A^{1-p}\\to0$. Ainsi $I(A)\\to1/(p-1)$ : l'intégrale converge.\n- Si $p<1$, alors $1-p>0$ et $A^{1-p}\\to+\\infty$. Ainsi $I(A)\\to+\\infty$ : elle diverge.\n\n**Cas 2 : $p=1$.** On a $I(A)=\\int_1^A dx/x=\\ln A\\to+\\infty$ ; elle diverge.\n\n**Conclusion :**\n\\[\n\\boxed{\\int_1^{+\\infty}x^{-p}\\,dx\\text{ converge si et seulement si }p>1.}\n\\]\nDans ce cas, sa valeur est $1/(p-1)$.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-39",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Facile",
    "title": "Espaces vectoriels — Facile · Exercice 39",
    "question": "Énoncer l'inégalité triangulaire pour une norme \\(\\|\\cdot\\|\\).",
    "hints": [
      "Comparer la norme d'une somme à la somme des normes."
    ],
    "answer": "Pour tous x,y, ‖x+y‖≤‖x‖+‖y‖.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-40",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Avancé",
    "title": "Espaces vectoriels — Avancé · Exercice 40",
    "question": "Sur \\([-1,1]\\), on définit \\(\\langle P,Q\\rangle=\\displaystyle\\int_{-1}^1P(x)Q(x)\\,dx\\). Vérifier que \\(P_0(x)=1\\) et \\(P_1(x)=x\\) sont orthogonaux, puis calculer leurs normes.",
    "hints": [
      "Calculer ∫₋₁¹ x dx et utiliser la parité."
    ],
    "answer": "Par définition du produit scalaire,\n\\[\n\\langle P_0,P_1\\rangle=\\int_{-1}^1 1\\cdot x\\,dx=\\left[\\frac{x^2}{2}\\right]_{-1}^{1}=\\frac12-\\frac12=0.\n\\]\nLes deux polynômes sont donc orthogonaux.\n\nCalculons leurs normes :\n\\[\n\\|P_0\\|^2=\\int_{-1}^1 1\\,dx=2,\n\\qquad\n\\|P_1\\|^2=\\int_{-1}^1 x^2\\,dx=\\left[\\frac{x^3}{3}\\right]_{-1}^{1}=\\frac23.\n\\]\nPar positivité des normes,\n\\[\n\\boxed{\\|P_0\\|=\\sqrt2,\\qquad\\|P_1\\|=\\sqrt{\\frac23}}.\n\\]\nLa famille $(P_0,P_1)$ est donc orthogonale et chacun de ses vecteurs est non nul.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-41",
    "topic": "derivative",
    "category": "Analyse",
    "difficulty": "Facile",
    "title": "Dérivation — Facile · Exercice 41",
    "question": "Appliquer le théorème de Rolle à la fonction \\(f(x)=x^2-1\\) sur \\([-1,1]\\).",
    "hints": [
      "Vérifier f(−1)=f(1) puis calculer la dérivée."
    ],
    "answer": "f est continue sur [−1,1], dérivable sur ]−1,1[ et f(−1)=f(1)=0. Il existe c avec f′(c)=2c=0 ; c=0.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-42",
    "topic": "limits",
    "category": "Analyse",
    "difficulty": "Intermédiaire",
    "title": "Limites et convergence — Intermédiaire · Exercice 42",
    "question": "Soit \\(u_n=\\frac{5n-2}{2n+3}\\). Démontrer avec la définition \\(\\varepsilon\\)-\\(N\\) que \\(u_n\\to\\frac52\\).",
    "hints": [
      "Calculer |uₙ−5/2| exactement."
    ],
    "answer": "|uₙ−5/2|=19/[2(2n+3)]≤19/(4n). Pour ε>0, choisir N>19/(4ε). Alors n≥N entraîne |uₙ−5/2|<ε.",
    "solutionSteps": ["**1. Calculer exactement l'écart à la limite annoncée.** On a $\\displaystyle u_n-\\frac52=\\frac{5n-2}{2n+3}-\\frac52=\\frac{2(5n-2)-5(2n+3)}{2(2n+3)}=-\\frac{19}{2(2n+3)}$. Ainsi, $\\displaystyle \\left|u_n-\\frac52\\right|=\\frac{19}{2(2n+3)}$.","**2. Trouver une majoration simple.** Pour $n\\geq1$, $2(2n+3)=4n+6\\geq4n$. Par conséquent, $\\displaystyle \\left|u_n-\\frac52\\right|\\leq\\frac{19}{4n}$.","**3. Choisir le rang en fonction de ε.** Soit $\\varepsilon>0$. Prenons $N=\\max\\left(1,\\lfloor 19/(4\\varepsilon)\\rfloor+1\\right)$. Pour tout $n\\geq N$, on a $n>19/(4\\varepsilon)$, donc $\\displaystyle \\left|u_n-\\frac52\\right|\\leq\\frac{19}{4n}<\\varepsilon$.","**Conclusion.** La définition $\\varepsilon$-$N$ est satisfaite : $\\boxed{u_n\\longrightarrow\\frac52}$."],
    "check": "Point de vigilance : la majoration 19/(4n) est utilisée pour n≥1 ; il faut donc imposer N≥1."
  },
  {
    "id": "m4-43",
    "topic": "limits",
    "category": "Analyse",
    "difficulty": "Avancé",
    "title": "Limites et convergence — Avancé · Exercice 43",
    "question": "Soient \\((u_n)\\) et \\((v_n)\\) deux suites réelles convergeant respectivement vers \\(\\ell\\) et \\(m\\). Démontrer que \\(u_nv_n\\to\\ell m\\) sans invoquer directement le théorème sur le produit.",
    "hints": [
      "Utiliser uₙvₙ−ℓm=uₙ(vₙ−m)+m(uₙ−ℓ)."
    ],
    "answer": "Comme $(u_n)$ converge, elle est bornée : il existe $C>0$ et $N_0$ tels que $|u_n|\\leq C$ pour $n\\geq N_0$.\n\nPour tout $n\\geq N_0$, on écrit\n\\[\nu_nv_n-\\ell m=u_n(v_n-m)+m(u_n-\\ell).\n\\]\nD'où\n\\[\n|u_nv_n-\\ell m|\\leq C|v_n-m|+|m|\\,|u_n-\\ell|.\n\\]\nSoit $\\varepsilon>0$. Puisque $v_n\\to m$, il existe $N_1$ tel que $n\\geq N_1$ implique $|v_n-m|<\\varepsilon/(2(C+1))$. Puisque $u_n\\to\\ell$, il existe $N_2$ tel que $n\\geq N_2$ implique $|u_n-\\ell|<\\varepsilon/(2(|m|+1))$.\n\nPour $n\\geq N=\\max(N_0,N_1,N_2)$, on obtient $|u_nv_n-\\ell m|<\\varepsilon/2+\\varepsilon/2=\\varepsilon$. Donc\n\\[\n\\boxed{u_nv_n\\longrightarrow\\ell m}.\n\\]",
    "solutionSteps": ["**1. Utiliser la convergence de $(u_n)$ pour obtenir une borne.** Toute suite convergente est bornée. Il existe donc $C>0$ et $N_0\\in\\mathbb N$ tels que, pour tout $n\\geq N_0$, $|u_n|\\leq C$.","**2. Décomposer la différence.** Pour tout $n\\geq N_0$, on écrit $u_nv_n-\\ell m=u_n(v_n-m)+m(u_n-\\ell)$. L'inégalité triangulaire donne alors $\\displaystyle |u_nv_n-\\ell m|\\leq C|v_n-m|+|m|\\,|u_n-\\ell|$.","**3. Exploiter séparément les deux convergences.** Soit $\\varepsilon>0$. Comme $v_n\\to m$, il existe $N_1$ tel que $n\\geq N_1$ implique $\\displaystyle |v_n-m|<\\frac{\\varepsilon}{2(C+1)}$. Comme $u_n\\to\\ell$, il existe $N_2$ tel que $n\\geq N_2$ implique $\\displaystyle |u_n-\\ell|<\\frac{\\varepsilon}{2(|m|+1)}$.","**4. Réunir les conditions.** Posons $N=\\max(N_0,N_1,N_2)$. Pour tout $n\\geq N$, les trois estimations précédentes sont valables, et $\\displaystyle |u_nv_n-\\ell m|<\\frac{C\\varepsilon}{2(C+1)}+\\frac{|m|\\varepsilon}{2(|m|+1)}<\\frac{\\varepsilon}{2}+\\frac{\\varepsilon}{2}=\\varepsilon$.","**Conclusion.** Pour tout $\\varepsilon>0$, l'écart au produit $\\ell m$ est inférieur à $\\varepsilon$ à partir d'un certain rang. Donc $\\boxed{u_nv_n\\longrightarrow\\ell m}$."],
    "check": "Point de vigilance : la bornitude de (u_n) est indispensable pour contrôler le premier terme. Elle découle de la convergence de cette suite."
  },
  {
    "id": "m4-44",
    "topic": "continuity",
    "category": "Analyse",
    "difficulty": "Intermédiaire",
    "title": "Continuité — Intermédiaire · Exercice 44",
    "question": "Étudier la continuité en \\(0\\) de la fonction définie par \\(f(x)=x\\sin(1/x)\\) si \\(x\\neq0\\) et \\(f(0)=0\\).",
    "hints": [
      "Utiliser |sin t|≤1."
    ],
    "answer": "|f(x)−f(0)|=|x sin(1/x)|≤|x|→0. Donc f est continue en 0.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-45",
    "topic": "derivative",
    "category": "Analyse",
    "difficulty": "Avancé",
    "title": "Dérivation — Avancé · Exercice 45",
    "question": "Soit \\(f\\) dérivable sur un intervalle \\(I\\) et telle que \\(f'(x)=0\\) pour tout \\(x\\in I\\). Démontrer que \\(f\\) est constante.",
    "hints": [
      "Appliquer le théorème des accroissements finis entre deux points."
    ],
    "answer": "Soient $a,b\\in I$ avec $a<b$. L'intervalle $I$ étant un intervalle, $[a,b]\\subset I$. La fonction $f$ est dérivable sur $I$, donc continue sur $[a,b]$ et dérivable sur $]a,b[$. Le théorème des accroissements finis s'applique : il existe $c\\in]a,b[$ tel que\n\\[\nf(b)-f(a)=f'(c)(b-a).\n\\]\nOr $f'(c)=0$ par hypothèse, donc $f(b)-f(a)=0$, c'est-à-dire $f(a)=f(b)$. Cette égalité vaut pour tous $a<b$ dans $I$ ; ainsi toutes les valeurs de $f$ sont égales et\n\\[\n\\boxed{f\\text{ est constante sur }I.}\n\\]",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-46",
    "topic": "continuity",
    "category": "Analyse",
    "difficulty": "Avancé",
    "title": "Continuité — Avancé · Exercice 46",
    "question": "Démontrer que l'équation \\(x^3+x-1=0\\) admet une unique solution réelle.",
    "hints": [
      "TVI sur [0,1], puis étudier la dérivée sur ℝ."
    ],
    "answer": "Posons $g(x)=x^3+x-1$. C'est un polynôme, donc une fonction continue et dérivable sur $\\mathbb R$.\n\n**Existence.** On a $g(0)=-1<0$ et $g(1)=1>0$. Par le théorème des valeurs intermédiaires sur $[0,1]$, il existe $\\alpha\\in]0,1[$ tel que $g(\\alpha)=0$.\n\n**Unicité.** Pour tout $x\\in\\mathbb R$, $g'(x)=3x^2+1>0$. Ainsi $g$ est strictement croissante sur $\\mathbb R$. Une fonction strictement croissante ne peut prendre une même valeur deux fois : si $x_1<x_2$, alors $g(x_1)<g(x_2)$. L'équation $g(x)=0$ possède donc au plus une solution.\n\nEn combinant existence et unicité, l'équation admet exactement une solution réelle $\\boxed{\\alpha\\in]0,1[}$.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-47",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Intermédiaire",
    "title": "Espaces vectoriels — Intermédiaire · Exercice 47",
    "question": "Montrer que \\(F=\\{(x,y,z)\\in\\mathbb R^3\\mid x+y+z=0\\}\\) est un sous-espace vectoriel et en donner une base.",
    "hints": [
      "Paramétrer avec x et y."
    ],
    "answer": "F=Ker(φ), φ(x,y,z)=x+y+z, donc F est un sous-espace. (x,y,z)=(x,y,−x−y)=x(1,0,−1)+y(0,1,−1). Une base est \\(\\left(\\begin{pmatrix}1\\\\0\\\\-1\\end{pmatrix},\\begin{pmatrix}0\\\\1\\\\-1\\end{pmatrix}\\right)\\).",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-48",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Avancé",
    "title": "Espaces vectoriels — Avancé · Exercice 48",
    "question": "Montrer que la famille \\(\\big((1,1,0),(1,0,1),(0,1,1)\\big)\\) est une base de \\(\\mathbb R^3\\).",
    "hints": [
      "Calculer le déterminant de la matrice ayant ces vecteurs pour colonnes."
    ],
    "answer": "Considérons la matrice ayant ces vecteurs pour colonnes :\n\\[\nA=\\begin{pmatrix}1&1&0\\\\1&0&1\\\\0&1&1\\end{pmatrix}.\n\\]\nCalculons son déterminant en développant suivant la première ligne :\n\\[\n\\det A=1\\begin{vmatrix}0&1\\\\1&1\\end{vmatrix}-1\\begin{vmatrix}1&1\\\\0&1\\end{vmatrix}\n=(0-1)-(1-0)=-2.\n\\]\nLe déterminant est non nul. Les colonnes de $A$ sont donc linéairement indépendantes. Or une famille de trois vecteurs libres dans l'espace $\\mathbb R^3$, de dimension $3$, est automatiquement une base.\n\\[\n\\boxed{((1,1,0),(1,0,1),(0,1,1))\\text{ est une base de }\\mathbb R^3.}\n\\]",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-49",
    "topic": "linear-maps",
    "category": "Algèbre",
    "difficulty": "Avancé",
    "title": "Applications linéaires — Avancé · Exercice 49",
    "question": "Soit \\(f\\in\\mathcal L(E)\\), où \\(E\\) est de dimension finie. On suppose que \\(f\\circ f=f\\) et que \\(f\\) est injective. Montrer que \\(f=\\operatorname{Id}_E\\).",
    "hints": [
      "Calculer f(f(x)−x)."
    ],
    "answer": "Soit $x\\in E$. L'identité $f\\circ f=f$ donne $f(f(x))=f(x)$. Par linéarité,\n\\[\nf(f(x)-x)=f(f(x))-f(x)=0.\n\\]\nAinsi $f(x)-x\\in\\ker f$. Or $f$ est injective, donc $\\ker f=\\{0_E\\}$. Il vient $f(x)-x=0_E$, donc $f(x)=x$.\n\nCette égalité étant vraie pour tout $x\\in E$, on conclut que\n\\[\n\\boxed{f=\\operatorname{Id}_E.}\n\\]\nLa dimension finie n'était en réalité pas nécessaire pour cette démonstration.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-50",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Intermédiaire",
    "title": "Espaces vectoriels — Intermédiaire · Exercice 50",
    "question": "Appliquer l'algorithme de Gram-Schmidt à \\(v_1=(1,1)\\) et \\(v_2=(1,0)\\) dans \\(\\mathbb R^2\\).",
    "hints": [
      "Normaliser v₁ avant de projeter v₂."
    ],
    "answer": "e₁=(1/√2,1/√2). Le produit scalaire ⟨v₂,e₁⟩=1/√2, donc le projeté vaut (1/2,1/2). w₂=(1/2,−1/2), ‖w₂‖=1/√2, donc e₂=(1/√2,−1/√2).",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-51",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Avancé",
    "title": "Espaces vectoriels — Avancé · Exercice 51",
    "question": "Appliquer l'algorithme de Gram-Schmidt à \\(v_1=(2,1)\\) et \\(v_2=(1,2)\\) dans \\(\\mathbb R^2\\) muni du produit scalaire usuel, et donner une base orthonormée.",
    "hints": [
      "Calculer e₁, le produit scalaire, puis le résidu."
    ],
    "answer": "**1. Premier vecteur.** On pose $u_1=v_1=(2,1)$. Sa norme vaut $\\|u_1\\|=\\sqrt{2^2+1^2}=\\sqrt5$. Ainsi\n\\[\ne_1=\\frac{u_1}{\\|u_1\\|}=\\frac1{\\sqrt5}(2,1).\n\\]\n\n**2. Projection de $v_2$.** On calcule\n\\[\n\\langle v_2,e_1\\rangle=\\frac{1\\cdot2+2\\cdot1}{\\sqrt5}=\\frac4{\\sqrt5}.\n\\]\nDonc $\\operatorname{proj}_{e_1}(v_2)=\\langle v_2,e_1\\rangle e_1=\\frac45(2,1)=(8/5,4/5)$.\n\n**3. Orthogonalisation.** Le résidu est\n\\[\nu_2=v_2-\\operatorname{proj}_{e_1}(v_2)=(-3/5,6/5).\n\\]\nSa norme vaut $\\sqrt{9/25+36/25}=3/\\sqrt5$. Par conséquent\n\\[\ne_2=\\frac{u_2}{\\|u_2\\|}=\\frac1{\\sqrt5}(-1,2).\n\\]\nOn vérifie $\\langle e_1,e_2\\rangle=(-2+2)/5=0$ et $\\|e_1\\|=\\|e_2\\|=1$. La base orthonormée cherchée est\n\\[\n\\boxed{\\left(\\frac{(2,1)}{\\sqrt5},\\frac{(-1,2)}{\\sqrt5}\\right)}.\n\\]",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-52",
    "topic": "eigenvalues",
    "category": "Algèbre",
    "difficulty": "Intermédiaire",
    "title": "Valeurs propres — Intermédiaire · Exercice 52",
    "question": "Diagonaliser la matrice \\(A=\\begin{pmatrix}2&1\\\\0&3\\end{pmatrix}\\).",
    "hints": [
      "Calculer les espaces propres associés à 2 et 3."
    ],
    "answer": "Les valeurs propres sont 2 et 3. E₂=\\(\\operatorname{Vect}\\!\\left(\\begin{pmatrix}1\\\\0\\end{pmatrix}\\right)\\) et E₃=\\(\\operatorname{Vect}\\!\\left(\\begin{pmatrix}1\\\\1\\end{pmatrix}\\right)\\). P=[[1,1],[0,1]], D=diag(2,3), et A=PDP⁻¹.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-53",
    "topic": "eigenvalues",
    "category": "Algèbre",
    "difficulty": "Avancé",
    "title": "Valeurs propres — Avancé · Exercice 53",
    "question": "Étudier la diagonalisabilité sur \\(\\mathbb R\\) de la matrice \\(A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}\\).",
    "hints": [
      "Calculer la dimension de Ker(A−I)."
    ],
    "answer": "**1. Polynôme caractéristique.** On calcule\n\\[\n\\chi_A(\\lambda)=\\det(A-\\lambda I)=\\begin{vmatrix}1-\\lambda&1\\\\0&1-\\lambda\\end{vmatrix}=(1-\\lambda)^2.\n\\]\nL'unique valeur propre est $\\lambda=1$, de multiplicité algébrique $2$.\n\n**2. Espace propre.** On résout $(A-I)X=0$. Or\n\\[\nA-I=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix},\\qquad (A-I)\\binom{x}{y}=\\binom{y}{0}.\n\\]\nLe système équivaut à $y=0$, avec $x$ libre. Donc\n\\[\nE_1=\\ker(A-I)=\\operatorname{Vect}\\left(\\binom10\\right),\\qquad \\dim E_1=1.\n\\]\n\n**3. Conclusion.** Une matrice $2\\times2$ est diagonalisable si et seulement si elle possède une base de deux vecteurs propres. Ici l'espace propre total est de dimension $1$ : il ne contient pas deux vecteurs indépendants. Ainsi\n\\[\n\\boxed{A\\text{ n'est pas diagonalisable sur }\\mathbb R.}\n\\]",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-54",
    "topic": "integrals",
    "category": "Analyse",
    "difficulty": "Avancé",
    "title": "Intégration — Avancé · Exercice 54",
    "question": "Pour \\(\\alpha\\in\\mathbb R\\), étudier la convergence de l'intégrale impropre \\(\\displaystyle\\int_0^1x^\\alpha\\,dx\\).",
    "hints": [
      "Traiter α=−1 séparément et faire tendre ε vers 0⁺."
    ],
    "answer": "L'intégrande peut être non bornée au voisinage de $0$, donc on étudie, pour $\\varepsilon\\in]0,1[$,\n\\[\nI(\\varepsilon)=\\int_\\varepsilon^1x^\\alpha\\,dx.\n\\]\n\n**Cas 1 : $\\alpha\\ne-1$.** Une primitive sur $]0,1]$ est $x^{\\alpha+1}/(\\alpha+1)$. Donc\n\\[\nI(\\varepsilon)=\\frac{1-\\varepsilon^{\\alpha+1}}{\\alpha+1}.\n\\]\nSi $\\alpha+1>0$, alors $\\varepsilon^{\\alpha+1}\\to0$ et $I(\\varepsilon)\\to1/(\\alpha+1)$ : l'intégrale converge. Si $\\alpha+1<0$, alors $\\varepsilon^{\\alpha+1}\\to+\\infty$ et $I(\\varepsilon)\\to+\\infty$ : elle diverge.\n\n**Cas 2 : $\\alpha=-1$.** On a $I(\\varepsilon)=\\int_\\varepsilon^1dx/x=-\\ln\\varepsilon\\to+\\infty$ ; elle diverge.\n\nAinsi\n\\[\n\\boxed{\\int_0^1x^\\alpha\\,dx\\text{ converge si et seulement si }\\alpha>-1,}\n\\]\net sa valeur est alors $1/(\\alpha+1)$.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-55",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Intermédiaire",
    "title": "Espaces vectoriels — Intermédiaire · Exercice 55",
    "question": "Démontrer que \\(\\big|\\|x\\|-\\|y\\|\\big|\\leq\\|x-y\\|\\) à partir de l'inégalité triangulaire.",
    "hints": [
      "Écrire x=(x−y)+y, puis échanger x et y."
    ],
    "answer": "‖x‖≤‖x−y‖+‖y‖ donne ‖x‖−‖y‖≤‖x−y‖. En échangeant x et y, on obtient ‖y‖−‖x‖≤‖x−y‖. D'où l'inégalité.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-56",
    "topic": "limits",
    "category": "Analyse",
    "difficulty": "Avancé",
    "title": "Limites et convergence — Avancé · Exercice 56",
    "question": "Soit \\(u_0>0\\) et \\(u_{n+1}=\\frac12\\left(u_n+\\frac{2}{u_n}\\right)\\). Étudier la convergence de \\((u_n)\\) et déterminer sa limite.",
    "hints": [
      "Montrer que $u_n\\geq\\sqrt2$, puis étudier $u_{n+1}-u_n$ et exploiter la relation de récurrence."
    ],
    "answer": "**1. Minoration.** Pour $x>0$, $\\frac12(x+2/x)\\geq\\sqrt2$ par l'inégalité arithmético-géométrique. Ainsi $u_n>0$ et, dès le rang $1$, $u_n\\geq\\sqrt2$.\n\n**2. Monotonie à partir du rang 1.** Pour $n\\geq1$,\n\\[u_{n+1}-u_n=\\frac{2-u_n^2}{2u_n}.\\]\nSi $u_n\\geq\\sqrt2$, le numérateur est négatif ou nul : la suite est décroissante à partir du rang 1. Elle est minorée par $\\sqrt2$, donc converge vers $\\ell\\geq\\sqrt2$.\n\n**3. Limite.** La fonction $x\\mapsto\\frac12(x+2/x)$ est continue sur $]0,+\\infty[$. En passant à la limite, $\\ell=\\frac12(\\ell+2/\\ell)$, donc $\\ell^2=2$. Comme $\\ell>0$, $\\boxed{\\ell=\\sqrt2}$. ",
    "solutionSteps": ["**1. Établir une minoration à partir du rang 1.** Pour tout $x>0$, l'inégalité arithmético-géométrique donne $\\frac12\\left(x+\\frac2x\\right)\\geq\\sqrt{x\\cdot(2/x)}=\\sqrt2$. Comme $u_0>0$, la récurrence assure que tous les termes sont positifs et que $u_n\\geq\\sqrt2$ pour tout $n\\geq1$.","**2. Étudier la monotonie à partir du rang 1.** Pour $n\\geq1$, on calcule $\\displaystyle u_{n+1}-u_n=\\frac12\\left(u_n+\\frac2{u_n}\\right)-u_n=\\frac{2-u_n^2}{2u_n}$. Or $u_n\\geq\\sqrt2$ et $u_n>0$, donc $2-u_n^2\\leq0$ et $u_{n+1}-u_n\\leq0$. La suite est décroissante à partir du rang 1.","**3. Conclure à la convergence.** La suite $(u_n)_{n\\geq1}$ est décroissante et minorée par $\\sqrt2$. Le théorème de convergence monotone assure qu'elle converge vers une limite $\\ell\\geq\\sqrt2$.","**4. Déterminer la limite.** La fonction $x\\mapsto\\frac12\\left(x+\\frac2x\\right)$ est continue sur $]0,+\\infty[$. Comme $\\ell\\geq\\sqrt2>0$, on peut passer à la limite dans la récurrence : $\\displaystyle \\ell=\\frac12\\left(\\ell+\\frac2\\ell\\right)$. On obtient $\\ell^2=2$. Puisque $\\ell>0$, $\\ell=\\sqrt2$.","**Conclusion.** $\\boxed{u_n\\longrightarrow\\sqrt2}$."],
    "check": "Point de vigilance : la décroissance n'est démontrée qu'à partir du rang 1. Il n'est pas nécessaire que u₀ soit supérieur à √2."
  },
  {
    "id": "m4-57",
    "topic": "derivative",
    "category": "Analyse",
    "difficulty": "Avancé",
    "title": "Dérivation — Avancé · Exercice 57",
    "question": "Soit \\(f:[a,b]\\to\\mathbb R\\) continue sur \\([a,b]\\), dérivable sur \\(]a,b[\\), et telle que \\(f(a)=f(b)=0\\). Montrer qu'il existe \\(c\\in]a,b[\\) tel que \\(f'(c)=0\\), puis préciser pourquoi l'hypothèse \\(f(a)=f(b)\\) est essentielle.",
    "hints": [
      "Appliquer Rolle et construire un contre-exemple lorsque les valeurs aux bornes sont différentes."
    ],
    "answer": "**Existence.** Les hypothèses du théorème de Rolle sont exactement réunies : continuité sur le segment, dérivabilité à l'intérieur et égalité des valeurs aux extrémités. Il existe donc $c\\in]a,b[$ tel que $f'(c)=0$.\n\n**Rôle de l'égalité aux bornes.** Elle ne peut être supprimée : sur $[0,1]$, la fonction $f(x)=x$ est continue et dérivable, mais $f'(x)=1$ pour tout $x$. Il n'existe donc aucun $c$ tel que $f'(c)=0$. ",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-58",
    "topic": "vector-spaces",
    "category": "Algèbre",
    "difficulty": "Avancé",
    "title": "Espaces vectoriels — Avancé · Exercice 58",
    "question": "Dans \\(\\mathbb R^3\\), on pose \\(F=\\{(x,y,z)\\mid x+y+z=0\\}\\) et \\(G=\\operatorname{Vect}(1,1,1)\\). Démontrer que \\(\\mathbb R^3=F\\oplus G\\).",
    "hints": [
      "Montrer d'abord que $F$ est un plan, puis que $F\\cap G=\\{0\\}$ et utiliser les dimensions."
    ],
    "answer": "**1. Nature de $F$.** Considérons la forme linéaire $\\varphi(x,y,z)=x+y+z$. Elle est non nulle et $F=\\ker\\varphi$. Par le théorème du rang, $\\dim F=3-1=2$.\n\n**2. Dimension de $G$.** Le vecteur $(1,1,1)$ étant non nul, $G$ est une droite et $\\dim G=1$.\n\n**3. Intersection.** Si $(t,t,t)\\in F$, alors $3t=0$, donc $t=0$. Ainsi $F\\cap G=\\{0\\}$.\n\n**4. Conclusion.** La somme est directe et $\\dim F+\\dim G=2+1=3=\\dim\\mathbb R^3$. Donc $\\boxed{\\mathbb R^3=F\\oplus G}$. ",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-59",
    "topic": "linear-maps",
    "category": "Algèbre",
    "difficulty": "Avancé",
    "title": "Applications linéaires — Avancé · Exercice 59",
    "question": "Soit \\(f:E\\to F\\) linéaire, avec \\(E\\) et \\(F\\) de dimension finie et \\(\\dim E=\\dim F\\). Démontrer l'équivalence entre l'injectivité, la surjectivité et la bijectivité de \\(f\\).",
    "hints": [
      "Utiliser le théorème du rang pour relier la dimension du noyau et celle de l'image."
    ],
    "answer": "**Injectivité $\\Rightarrow$ surjectivité.** Si $f$ est injective, alors $\\ker f=\\{0\\}$ et $\\dim\\ker f=0$. Le théorème du rang donne $\\dim\\operatorname{Im}f=\\dim E=\\dim F$. Comme $\\operatorname{Im}f$ est un sous-espace de $F$ de même dimension que $F$, il est égal à $F$. Donc $f$ est surjective.\n\n**Surjectivité $\\Rightarrow$ injectivité.** Si $f$ est surjective, $\\operatorname{Im}f=F$, donc $\\dim\\operatorname{Im}f=\\dim F=\\dim E$. Le théorème du rang donne $\\dim\\ker f=0$, donc $\\ker f=\\{0\\}$ et $f$ est injective.\n\nEnfin, bijectivité équivaut par définition à injectivité et surjectivité simultanées. Les trois propriétés sont donc équivalentes. ",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-60",
    "topic": "eigenvalues",
    "category": "Algèbre",
    "difficulty": "Avancé",
    "title": "Valeurs propres — Avancé · Exercice 60",
    "question": "Soit \\(A=\\begin{pmatrix}2&1\\\\0&2\\end{pmatrix}\\). Déterminer ses valeurs propres et ses sous-espaces propres, puis conclure sur sa diagonalisabilité.",
    "hints": [
      "Calculer $\\chi_A(\\lambda)$ puis résoudre $(A-2I)X=0$."
    ],
    "answer": "**1. Valeur propre.**\n\\[\\chi_A(\\lambda)=\\det\\begin{pmatrix}2-\\lambda&1\\\\0&2-\\lambda\\end{pmatrix}=(2-\\lambda)^2.\\]\nLa seule valeur propre est $2$, de multiplicité algébrique $2$.\n\n**2. Sous-espace propre.**\n\\[A-2I=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}.\\]\nLe système $(A-2I)(x,y)^T=0$ équivaut à $y=0$. Ainsi $E_2=\\operatorname{Vect}((1,0))$ et $\\dim E_2=1$.\n\n**3. Conclusion.** Une matrice d'ordre $2$ est diagonalisable si son espace propre total est de dimension $2$. Ici il est de dimension $1$ ; donc $\\boxed{A\\text{ n'est pas diagonalisable}}$. ",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id": "m4-61",
    "topic": "integrals",
    "category": "Analyse",
    "difficulty": "Avancé",
    "title": "Intégration — Avancé · Exercice 61",
    "question": "Pour \\(a>0\\), calculer \\(I(a)=\\displaystyle\\int_0^1\\frac{dx}{1+ax}\\) et déterminer sa limite lorsque \\(a\\to+\\infty\\).",
    "hints": [
      "Chercher une primitive en faisant apparaître le logarithme, puis étudier $\\ln(1+a)/a$."
    ],
    "answer": "Pour $a>0$, la fonction $x\\mapsto1/(1+ax)$ est continue sur $[0,1]$. Une primitive est $x\\mapsto\\frac1a\\ln(1+ax)$. Donc\n\\[I(a)=\\left[\\frac1a\\ln(1+ax)\\right]_0^1=\\frac{\\ln(1+a)}a.\\]\nPour la limite, on sait que $\\ln t/t\\to0$ lorsque $t\\to+\\infty$. En posant $t=1+a$, on obtient\n\\[I(a)=\\frac{\\ln(1+a)}{1+a}\\cdot\\frac{1+a}{a}\\longrightarrow0\\cdot1=0.\\]\nAinsi $\\boxed{\\lim_{a\\to+\\infty}I(a)=0}$. ",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
  },
  {
    "id":"m4-101","topic":"limits","category":"Analyse","difficulty":"Facile",
    "title":"Limites et convergence — Définition ε-N",
    "question":"Démontrer avec la définition que la suite $u_n=\\frac{1}{n+1}$ converge vers $0$.",
    "hints":["Soit $\\varepsilon>0$. Résoudre l'inégalité $\\frac{1}{n+1}<\\varepsilon$ par rapport à $n$.","Le rang choisi doit être entier et strictement supérieur à $1/\\varepsilon-1$."],
    "answer":"Pour $\\varepsilon>0$, prenons $N=\\max(0,\\lfloor1/\\varepsilon\\rfloor)$. Pour $n\\geq N$, on a $n+1>1/\\varepsilon$, donc $0\\leq u_n<\\varepsilon$. Ainsi $u_n\\to0$.",
    "solutionSteps":["**1. Écrire ce qu'il faut démontrer.** Pour tout $\\varepsilon>0$, nous devons trouver $N\\in\\mathbb N$ tel que $n\\geq N$ entraîne $|u_n|<\\varepsilon$.","**2. Transformer l'inégalité.** Comme $u_n=1/(n+1)>0$, la condition devient $1/(n+1)<\\varepsilon$, soit $n+1>1/\\varepsilon$.","**3. Choisir un rang entier.** Posons $N=\\max(0,\\lfloor1/\\varepsilon\\rfloor)$. Alors $N+1>1/\\varepsilon$. Pour tout $n\\geq N$, on a donc $n+1\\geq N+1>1/\\varepsilon$, d'où $0<1/(n+1)<\\varepsilon$.","**Conclusion.** La définition est vérifiée pour tout $\\varepsilon>0$, donc $\\boxed{u_n\\to0}$. "],
    "check":"Le rang N dépend de ε, mais il doit être fixé avant de considérer tous les n≥N."
  },
  {
    "id":"m4-102","topic":"limits","category":"Analyse","difficulty":"Intermédiaire",
    "title":"Limites et convergence — Unicité de la limite",
    "question":"À l'aide de la définition de la convergence et de l'inégalité triangulaire, démontrer qu'une suite réelle ne peut pas converger vers deux réels distincts.",
    "hints":["Supposer que la suite converge vers ℓ et vers m.","Majorer |ℓ−m| par une somme de deux écarts qui tendent vers 0."],
    "answer":"Pour tout ε>0, à partir d'un certain rang, |uₙ−ℓ|<ε/2 et |uₙ−m|<ε/2. Ainsi |ℓ−m|≤|ℓ−uₙ|+|uₙ−m|<ε. Comme ceci vaut pour tout ε>0, ℓ=m.",
    "solutionSteps":["**1. Raisonner par hypothèse.** Supposons que $u_n\\to\\ell$ et $u_n\\to m$. Nous voulons montrer que $\\ell=m$.","**2. Utiliser les deux convergences.** Soit $\\varepsilon>0$. Puisque $u_n\\to\\ell$, il existe $N_1$ tel que $n\\geq N_1$ implique $|u_n-\\ell|<\\varepsilon/2$. De même, il existe $N_2$ tel que $n\\geq N_2$ implique $|u_n-m|<\\varepsilon/2$.","**3. Réunir les deux estimations.** Pour $n\\geq N=\\max(N_1,N_2)$, l'inégalité triangulaire donne $|\\ell-m|\\leq|\\ell-u_n|+|u_n-m|<\\varepsilon$.","**4. Conclure.** Le réel $|\\ell-m|$ est inférieur à tout réel strictement positif. Il est donc nul : $\\boxed{\\ell=m}$. La limite est unique."],
    "check":"Il faut prendre le maximum des deux rangs pour que les deux estimations soient vraies simultanément."
  },
  {
    "id":"m4-103","topic":"limits","category":"Analyse","difficulty":"Intermédiaire",
    "title":"Limites et convergence — Théorème des gendarmes",
    "question":"Démontrer que la suite $u_n=\\frac{(-1)^n}{n+1}$ converge vers $0$.",
    "hints":["Utiliser $-\\frac1{n+1}\\leq u_n\\leq\\frac1{n+1}$.","Les deux suites qui encadrent uₙ ont-elles la même limite ?"],
    "answer":"On a $-1/(n+1)\\leq u_n\\leq1/(n+1)$ et les deux bornes tendent vers 0. Par le théorème des gendarmes, uₙ tend vers 0.",
    "solutionSteps":["**1. Construire un encadrement.** Puisque $(-1)^n$ vaut $-1$ ou $1$, on a, pour tout $n\\in\\mathbb N$, $-\\frac1{n+1}\\leq\\frac{(-1)^n}{n+1}\\leq\\frac1{n+1}$.","**2. Calculer les limites des bornes.** On sait que $1/(n+1)\\to0$. Par changement de signe, $-1/(n+1)\\to0$ également.","**3. Appliquer le théorème.** La suite $u_n$ est encadrée par deux suites qui convergent vers le même réel $0$. Le théorème des gendarmes donne donc $\\boxed{u_n\\to0}$. "],
    "check":"La suite alterne de signe : il ne faut pas essayer de prouver sa monotonie. L'encadrement est la méthode adaptée."
  },
  {
    "id":"m4-104","topic":"limits","category":"Analyse","difficulty":"Avancé",
    "title":"Limites et convergence — Suite récurrente monotone",
    "question":"On définit $u_0=0$ et $u_{n+1}=\\frac{u_n+4}{2}$. Démontrer que la suite converge et déterminer sa limite.",
    "hints":["Montrer par récurrence que $0\\leq u_n\\leq4$.","Étudier $u_{n+1}-u_n$, puis utiliser le théorème de convergence monotone."],
    "answer":"Par récurrence, 0≤uₙ≤4. De plus, uₙ₊₁−uₙ=(4−uₙ)/2≥0 : la suite est croissante et majorée par 4, donc converge. Si sa limite est ℓ, alors ℓ=(ℓ+4)/2, d'où ℓ=4.",
    "solutionSteps":["**1. Établir un encadrement invariant.** On a $u_0=0\\in[0,4]$. Si $0\\leq u_n\\leq4$, alors $2\\leq(u_n+4)/2\\leq4$, donc $u_{n+1}\\in[0,4]$. Par récurrence, $0\\leq u_n\\leq4$ pour tout $n$.","**2. Montrer la croissance.** On calcule $u_{n+1}-u_n=(4-u_n)/2$. Comme $u_n\\leq4$, cette différence est positive ou nulle. La suite est donc croissante.","**3. Conclure à la convergence.** La suite est croissante et majorée par $4$. Le théorème de convergence monotone assure qu'elle converge vers un réel $\\ell\\in[0,4]$.","**4. Déterminer la limite.** La relation de récurrence et la continuité de l'application $x\\mapsto(x+4)/2$ donnent $\\ell=(\\ell+4)/2$. Ainsi $2\\ell=\\ell+4$, donc $\\boxed{\\ell=4}$. "],
    "check":"La résolution de l'équation ℓ=(ℓ+4)/2 ne prouve pas à elle seule la convergence : il faut d'abord établir croissance et majoration."
  },
  {
    "id":"m4-105","topic":"limits","category":"Analyse","difficulty":"Intermédiaire",
    "title":"Limites et convergence — Une suite bornée peut diverger",
    "question":"Montrer que la suite $u_n=(-1)^n$ est bornée mais ne converge pas.",
    "hints":["Commencer par établir −1≤uₙ≤1.","Étudier les termes d'indices pairs et impairs."],
    "answer":"La suite est bornée par 1 en valeur absolue. Mais u₂ₙ=1 et u₂ₙ₊₁=−1 pour tout n ; ces deux sous-suites ont des limites différentes. La suite ne converge donc pas.",
    "solutionSteps":["**1. Vérifier la bornitude.** Pour tout $n$, $u_n=(-1)^n\\in\\{-1,1\\}$. Donc $|u_n|=1$ : la suite est bornée.","**2. Considérer deux sous-suites.** Pour tout $n$, $u_{2n}=1$, donc la sous-suite paire converge vers $1$. En revanche, $u_{2n+1}=-1$, donc la sous-suite impaire converge vers $-1$.","**3. Conclure par unicité.** Si $(u_n)$ convergeait vers un réel $\\ell$, toutes ses sous-suites convergeraient vers ce même réel. On devrait donc avoir simultanément $\\ell=1$ et $\\ell=-1$, ce qui est impossible. La suite est divergente."],
    "check":"La bornitude est une condition nécessaire de convergence, pas une condition suffisante."
  },
  {
    "id":"m4-106","topic":"limits","category":"Analyse","difficulty":"Avancé",
    "title":"Limites et convergence — Limite d'une fonction en un point",
    "question":"Démontrer à l'aide de la définition ε-δ que $\\lim_{x\\to1}x^2=1$.",
    "hints":["Factoriser $|x^2-1|=|x-1||x+1|$.","Imposer d'abord $|x-1|<1$ pour contrôler le facteur $|x+1|$."],
    "answer":"Si |x−1|<1, alors 0<x<2 et |x+1|<3. Pour ε>0, choisir δ=min(1,ε/3). Alors 0<|x−1|<δ entraîne |x²−1|=|x−1||x+1|<3δ≤ε.",
    "solutionSteps":["**1. Partir de l'écart à la limite.** On cherche à contrôler $|x^2-1|$. La factorisation donne $|x^2-1|=|x-1||x+1|$.","**2. Contrôler le second facteur.** Si $|x-1|<1$, alors $0<x<2$, donc $1<x+1<3$ et $|x+1|<3$.","**3. Choisir δ.** Soit $\\varepsilon>0$. Posons $\\delta=\\min(1,\\varepsilon/3)$. Si $0<|x-1|<\\delta$, alors $|x-1|<1$ et $|x-1|<\\varepsilon/3$.","**4. Vérifier l'inégalité.** On obtient $|x^2-1|=|x-1||x+1|<3|x-1|<\\varepsilon$.","**Conclusion.** La définition $\\varepsilon$-$\\delta$ est satisfaite : $\\boxed{\\lim_{x\\to1}x^2=1}$. "],
    "check":"La contrainte δ≤1 est indispensable pour garantir la majoration |x+1|<3."
  }
];



/* Corrections pédagogiques détaillées des exercices dont la première version était trop condensée. */
const detailedExerciseSolutions = {
  "m4-4": [
    "Une fonction affine est de la forme x ↦ ax+b. Ici, f(x)=3x−2 est affine.",
    "Les fonctions constantes et l'identité sont continues sur ℝ. Plus généralement, toute fonction affine est continue sur ℝ, car elle est combinaison linéaire de fonctions continues.",
    "On peut aussi le vérifier directement : pour tout a réel, |f(x)−f(a)|=|3x−2−(3a−2)|=3|x−a|. Si l'on choisit δ=ε/3, alors |x−a|<δ entraîne |f(x)−f(a)|<ε.",
    "Donc f est continue en tout réel a, et par conséquent sur ℝ."
  ],
  "m4-5": [
    "On veut vérifier la continuité en 0. On a f(0)=|0|=0.",
    "Pour tout x réel, |f(x)−f(0)|=||x|−0|=|x|.",
    "Lorsque x tend vers 0, |x| tend vers 0. Ainsi f(x) tend vers f(0).",
    "Par définition de la continuité, la fonction valeur absolue est continue en 0."
  ],
  "m4-7": [
    "La fonction f(x)=x³−2x est un polynôme ; elle est donc dérivable sur ℝ.",
    "On dérive terme à terme : (x³)'=3x² et (−2x)'=−2.",
    "On obtient, pour tout réel x, f'(x)=3x²−2."
  ],
  "m4-8": [
    "Pour une fonction dérivable en a, la tangente au point d'abscisse a a pour équation y=f(a)+f'(a)(x−a).",
    "Ici f(x)=x², donc f'(x)=2x. À l'abscisse a=2, on trouve f(2)=4 et f'(2)=4.",
    "En remplaçant dans la formule, y=4+4(x−2)=4x−4.",
    "La tangente cherchée a donc pour équation y=4x−4."
  ],
  "m4-10": [
    "La dérivée de sin est cos : (sin x)'=cos x.",
    "Pour tout réel x, le cosinus appartient à l'intervalle [−1,1]. Par conséquent |cos x|≤1.",
    "On peut donc choisir M=1. Cette constante est optimale puisque |cos 0|=1."
  ],
  "m4-13": [
    "Posons g(x)=x³+x−1. C'est un polynôme, donc g est continue sur ℝ, en particulier sur [0,1].",
    "Aux extrémités, g(0)=−1 et g(1)=1.",
    "Le nombre 0 est compris entre g(0) et g(1). Le théorème des valeurs intermédiaires garantit donc l'existence d'un c dans [0,1] tel que g(c)=0.",
    "Comme les valeurs aux extrémités sont non nulles, c appartient même à ]0,1[. L'équation possède au moins une solution dans [0,1]."
  ],
  "m4-14": [
    "Une primitive de 2x est x², car (x²)'=2x.",
    "Par le théorème fondamental de l'analyse, l'intégrale vaut la différence des valeurs de cette primitive aux bornes : [x²]₀².",
    "On calcule 2²−0²=4. Ainsi l'intégrale vaut 4."
  ],
  "m4-15": [
    "On cherche une primitive de 3x²+2x. Une primitive est F(x)=x³+x², puisque F'(x)=3x²+2x.",
    "On applique la formule d'intégration sur [0,1] : l'intégrale vaut F(1)−F(0).",
    "Or F(1)=1+1=2 et F(0)=0. La valeur de l'intégrale est donc 2."
  ],
  "m4-17": [
    "Notons F={(x,0) : x∈ℝ}. Pour vérifier que F est un sous-espace vectoriel de ℝ², on contrôle qu'il contient le vecteur nul et qu'il est stable par combinaison linéaire.",
    "Le vecteur nul appartient à F puisque (0,0)=(0,0).",
    "Soient (x,0) et (y,0) dans F, et λ,μ réels. Alors λ(x,0)+μ(y,0)=(λx+μy,0), qui appartient encore à F.",
    "Les deux propriétés sont vérifiées : F est un sous-espace vectoriel de ℝ². Géométriquement, c'est l'axe des abscisses."
  ],
  "m4-18": [
    "Considérons l'application φ:ℝ³→ℝ définie par φ(x,y,z)=x−2y+z. Elle est linéaire, car elle est donnée par une combinaison linéaire des coordonnées.",
    "L'ensemble demandé est exactement le noyau de φ : H=Ker(φ).",
    "Or le noyau de toute application linéaire est un sous-espace vectoriel de l'espace de départ.",
    "Donc H est un sous-espace vectoriel de ℝ³. On peut aussi écrire z=−x+2y, ce qui donne H=Vect((1,0,−1),(0,1,2))."
  ],
  "m4-19": [
    "Une famille (v₁,v₂) est libre si la seule combinaison linéaire nulle est celle dont tous les coefficients sont nuls.",
    "Supposons λ(1,0)+μ(0,1)=(0,0). En identifiant les coordonnées, on obtient le système λ=0 et μ=0.",
    "La seule solution est donc λ=μ=0. La famille canonique ((1,0),(0,1)) est libre dans ℝ²."
  ],
  "m4-20": [
    "Pour tester la liberté, cherchons une relation linéaire entre les deux vecteurs.",
    "On remarque immédiatement que (2,2)=2(1,1). Le second vecteur est donc un multiple du premier.",
    "La relation −2(1,1)+(2,2)=(0,0) est une relation linéaire non triviale.",
    "La famille est liée. Elle ne peut donc pas être une base de ℝ²."
  ],
  "m4-21": [
    "Une application f est linéaire si, pour tous u,v et tous scalaires λ,μ, elle vérifie f(λu+μv)=λf(u)+μf(v).",
    "Posons u=(x₁,y₁) et v=(x₂,y₂). Alors λu+μv=(λx₁+μx₂, λy₁+μy₂).",
    "En appliquant f, on obtient (2λx₁+2μx₂, 2λy₁+2μy₂), qui est égal à λ(2x₁,2y₁)+μ(2x₂,2y₂)=λf(u)+μf(v).",
    "La propriété est vérifiée pour tous u,v,λ,μ : f est linéaire."
  ],
  "m4-22": [
    "Le noyau est l'ensemble des vecteurs envoyés sur le vecteur nul. Il faut donc résoudre f(x,y)=(0,0).",
    "Par définition de f, cela donne le système x+y=0 et x−y=0.",
    "En additionnant les deux équations, on obtient 2x=0, donc x=0. La première équation donne alors y=0.",
    "Le seul antécédent du vecteur nul est (0,0). Ainsi Ker(f)={(0,0)}."
  ],
  "m4-23": [
    "Pour une matrice carrée d'ordre 2, le déterminant de ((a,b),(c,d)) vaut ad−bc.",
    "Ici a=3, b=1, c=2 et d=4.",
    "On calcule donc det(A)=3×4−1×2=12−2=10."
  ],
  "m4-25": [
    "Notons X={(x,0):x∈ℝ} l'axe horizontal et Y={(0,y):y∈ℝ} l'axe vertical. Ces deux ensembles sont des sous-espaces de ℝ².",
    "Tout vecteur (x,y) de ℝ² se décompose en (x,y)=(x,0)+(0,y), avec un premier terme dans X et un second dans Y. Donc X+Y=ℝ².",
    "Si un vecteur appartient à X∩Y, il est de la forme (x,0)=(0,y). L'égalité des coordonnées impose x=0 et y=0.",
    "Ainsi X∩Y={(0,0)}. La somme est donc directe et ℝ²=X⊕Y."
  ],
  "m4-26": [
    "Le produit scalaire usuel de (a,b) et (c,d) est ac+bd.",
    "Pour les vecteurs donnés, on obtient 1×3+2×(−1)=3−2.",
    "Le produit scalaire vaut donc 1."
  ],
  "m4-27": [
    "Le produit scalaire de (1,1) et (1,−1) vaut 1×1+1×(−1)=0. Les deux vecteurs sont donc orthogonaux.",
    "Leur somme est (2,0), dont la norme au carré vaut 2²+0²=4.",
    "Les normes au carré des deux vecteurs initiaux valent chacune 1²+1²=2. Leur somme vaut 2+2=4.",
    "On retrouve bien le théorème de Pythagore : la norme au carré de la somme de deux vecteurs orthogonaux est la somme des carrés de leurs normes."
  ],
  "m4-29": [
    "Le projeté orthogonal de v sur une droite vectorielle dirigée par un vecteur non nul u est donné par projᵤ(v)=(⟨v,u⟩/⟨u,u⟩)u.",
    "Ici v=(2,1) et u=(1,0). On calcule ⟨v,u⟩=2 et ⟨u,u⟩=1.",
    "Le projeté vaut donc 2(1,0)=(2,0). La composante orthogonale restante est (0,1)."
  ],
  "m4-30": [
    "On commence par le premier vecteur : v₁=(1,0), qui est déjà unitaire. On pose donc e₁=(1,0).",
    "On retire à v₂ sa projection sur e₁. Comme ⟨v₂,e₁⟩=1, on obtient w₂=v₂−⟨v₂,e₁⟩e₁=(1,2)−(1,0)=(0,2).",
    "La norme de w₂ vaut 2. On normalise : e₂=w₂/‖w₂‖=(0,1).",
    "Les vecteurs e₁ et e₂ sont unitaires et orthogonaux. La base orthonormée obtenue est ((1,0),(0,1))."
  ],
  "m4-31": [
    "Le cosinus est 2π-périodique : cos(t+2π)=cos(t) pour tout réel t.",
    "Pour f(x)=cos(4x), une période T positive vérifie 4T=2πk pour un entier k. La plus petite période strictement positive correspond à k=1.",
    "On obtient T=2π/4=π/2. La période fondamentale est donc π/2."
  ],
  "m4-32": [
    "On utilise la formule de Taylor-Young en 0 à l'ordre 2. Pour une fonction deux fois dérivable au voisinage de 0, le développement est f(0)+f'(0)x+f''(0)x²/2+o(x²).",
    "Pour f(x)=eˣ, on a f(0)=1, f'(x)=eˣ et f''(x)=eˣ, donc f'(0)=f''(0)=1.",
    "En remplaçant dans la formule, on obtient eˣ=1+x+x²/2+o(x²) lorsque x tend vers 0."
  ],
  "m4-34": [
    "La matrice A est déjà diagonale : A=diag(2,3). Ses coefficients diagonaux sont donc ses valeurs propres.",
    "Pour λ=2, le vecteur e₁=(1,0) vérifie Ae₁=2e₁. Pour λ=3, e₂=(0,1) vérifie Ae₂=3e₂.",
    "Les vecteurs e₁ et e₂ forment la base canonique de ℝ², donc une base de vecteurs propres.",
    "La matrice est déjà diagonale dans cette base ; elle est donc diagonalisée avec P=I et D=A."
  ],
  "m4-35": [
    "Dans ℝ muni de sa topologie usuelle, le théorème de Heine-Borel affirme qu'un ensemble est compact si et seulement s'il est fermé et borné.",
    "L'intervalle [0,1] est fermé : il contient ses deux extrémités et son complémentaire est ouvert.",
    "Il est borné puisque tout x∈[0,1] vérifie |x|≤1.",
    "Il est donc compact dans ℝ."
  ],
  "m4-37": [
    "Considérons φ:ℝ³→ℝ définie par φ(x,y,z)=x−y+2z. Cette forme linéaire est non nulle, par exemple φ(1,0,0)=1.",
    "L'ensemble H donné est Ker(φ). Le théorème du rang donne dim(Ker φ)+dim(Im φ)=3.",
    "Comme φ est non nulle et à valeurs dans ℝ, son image est ℝ, de dimension 1.",
    "Par conséquent dim(H)=3−1=2. H est un plan vectoriel de ℝ³."
  ],
  "m4-39": [
    "L'inégalité triangulaire est l'une des propriétés fondamentales d'une norme.",
    "Elle affirme que, pour tous vecteurs x et y de l'espace vectoriel, la norme de leur somme est inférieure ou égale à la somme de leurs normes : ‖x+y‖≤‖x‖+‖y‖.",
    "Elle généralise l'inégalité triangulaire usuelle des longueurs et permet notamment de majorer la distance entre deux vecteurs."
  ],
  "m4-41": [
    "Le théorème de Rolle exige trois conditions : continuité sur le segment, dérivabilité à l'intérieur et égalité des valeurs aux deux extrémités.",
    "La fonction f(x)=x²−1 est polynomiale, donc continue sur [−1,1] et dérivable sur ]−1,1[.",
    "On calcule f(−1)=0 et f(1)=0. Toutes les hypothèses de Rolle sont donc satisfaites.",
    "Il existe c∈]−1,1[ tel que f'(c)=0. Or f'(x)=2x, donc 2c=0 et c=0."
  ],
  "m4-44": [
    "On étudie la continuité en 0. La valeur en ce point est f(0)=0.",
    "Pour x≠0, on a |f(x)−f(0)|=|x sin(1/x)|=|x|·|sin(1/x)|.",
    "Comme |sin(1/x)|≤1, on obtient 0≤|f(x)−f(0)|≤|x|.",
    "Or |x| tend vers 0 lorsque x tend vers 0. Par le théorème des gendarmes, f(x) tend vers f(0). La fonction est donc continue en 0, même si elle n'est pas dérivable en 0."
  ]
};
for (const exercise of window.EXERCISES) {
  if (!Array.isArray(exercise.solutionSteps) || exercise.solutionSteps.length === 0) {
    exercise.solutionSteps = detailedExerciseSolutions[exercise.id] || [exercise.answer || "Correction à compléter."];
  }
}

window.FLASHCARDS = [
{topic:"limits",front:"Définition de la convergence d'une suite",back:"Pour tout ε>0, il existe N tel que n≥N entraîne |uₙ−ℓ|<ε."},
{topic:"continuity",front:"Continuité en a",back:"f est continue en a si lim(x→a) f(x)=f(a)."},
{topic:"derivative",front:"Définition de f'(a)",back:"f'(a)=lim(h→0) [f(a+h)−f(a)]/h, si cette limite existe."},
{topic:"integrals",front:"Théorème fondamental de l'analyse",back:"Si F est une primitive de f continue sur [a,b], alors ∫ₐᵇ f(x)dx=F(b)−F(a)."},
{topic:"series",front:"Condition nécessaire de convergence d'une série",back:"Si Σuₙ converge, alors uₙ tend vers 0."},
{topic:"vector-spaces",front:"Critère de sous-espace vectoriel",back:"Non-vacuité et stabilité par toute combinaison linéaire λx+μy."},
{topic:"basis",front:"Définition d'une base",back:"Une famille à la fois libre et génératrice."},
{topic:"linear-maps",front:"Caractérisation d'une application linéaire",back:"f(λx+μy)=λf(x)+μf(y)."},
{topic:"matrices",front:"Critère d'inversibilité",back:"Une matrice carrée est inversible si et seulement si son déterminant est non nul."},
{topic:"eigenvalues",front:"Définition d'une valeur propre",back:"λ est valeur propre s'il existe x non nul tel que u(x)=λx."}
];
/* Contenu enrichi Terminale / L1 */

window.TOPICS.find(t=>t.id==="series").level="L1";
window.TOPICS.find(t=>t.id==="eigenvalues").level="L1";
window.TOPICS.push(...[{"id":"term-sequences","title":"Suites numériques","category":"Analyse","level":"Terminale","chapter":"Analyse","summary":"Étudier les suites explicites et récurrentes, leurs variations et leur convergence.","definitions":[["Convergence","$(u_n)$ converge vers $\\ell$ si $\\forall\\varepsilon>0$, il existe $N$ tel que $n\\geq N$ entraîne $|u_n-\\ell|<\\varepsilon$."],["Suite géométrique","Une suite de raison $q$ vérifie $u_{n+1}=qu_n$ et $u_n=u_0q^n$."]],"properties":["Suite arithmétique : $u_n=u_0+nr$.","Si $|q|<1$, alors $q^n\\to0$.","Toute suite croissante et majorée converge."],"example":"Pour $u_n=5(0,8)^n$, on a $u_n\\to0$ car $|0,8|<1$.","exerciseId":"term-ex-1","prerequisites":[]},{"id":"term-functions","title":"Dérivation et étude de fonctions","category":"Analyse","level":"Terminale","chapter":"Analyse","summary":"Calculer des dérivées, étudier les variations et déterminer tangentes et extrema.","definitions":[["Nombre dérivé","$f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}h$ lorsque cette limite existe."],["Tangente","La tangente au point d'abscisse $a$ a pour équation $y=f(a)+f'(a)(x-a)$."]],"properties":["$(uv)'=u'v+uv'$.","Si $f'\\geq0$ sur un intervalle, $f$ y est croissante.","Un extremum intérieur d'une fonction dérivable impose $f'(a)=0$."],"example":"Pour $f(x)=x^2-4x+1$, $f'(x)=2x-4$ : minimum en $2$, de valeur $-3$.","exerciseId":"term-ex-3","prerequisites":[]},{"id":"term-probability","title":"Probabilités et loi binomiale","category":"Analyse","level":"Terminale","chapter":"Probabilités","summary":"Utiliser les probabilités conditionnelles, les arbres pondérés et la loi binomiale.","definitions":[["Probabilité conditionnelle","Si $P(B)>0$, $P_B(A)=\\frac{P(A\\cap B)}{P(B)}$."],["Loi binomiale","$X\\sim\\mathcal B(n,p)$ compte les succès de $n$ épreuves de Bernoulli indépendantes de même paramètre $p$."]],"properties":["Probabilités totales : $P(A)=\\sum_iP(B_i)P_{B_i}(A)$.","$P(X=k)=\\binom nkp^k(1-p)^{n-k}$.","$E(X)=np$ et $V(X)=np(1-p)$. "],"example":"Pour $X\\sim\\mathcal B(5;0,2)$, $P(X=2)=\\binom52(0,2)^2(0,8)^3=0,2048$.","exerciseId":"term-ex-5","prerequisites":[]},{"id":"term-complex","title":"Nombres complexes","category":"Algèbre","level":"Terminale","chapter":"Algèbre","summary":"Manipuler les formes algébrique, trigonométrique et exponentielle.","definitions":[["Forme algébrique","Tout complexe s'écrit de façon unique $z=a+ib$, avec $a,b\\in\\mathbb R$ et $i^2=-1$."],["Module et argument","$|a+ib|=\\sqrt{a^2+b^2}$ ; un argument $\\theta$ vérifie $z=|z|e^{i\\theta}$."]],"properties":["$z\\overline z=|z|^2$ et $|zw|=|z||w|$.","Les arguments d'un produit s'additionnent modulo $2\\pi$.","Formule de Moivre : $(e^{i\\theta})^n=e^{in\\theta}$. "],"example":"Pour $z=1+i$, $|z|=\\sqrt2$ et un argument vaut $\\pi/4$.","exerciseId":"term-ex-7","prerequisites":[]},{"id":"term-vectors","title":"Géométrie vectorielle dans l'espace","category":"Algèbre","level":"Terminale","chapter":"Géométrie","summary":"Utiliser les coordonnées, le produit scalaire et les équations cartésiennes de plans.","definitions":[["Produit scalaire","Pour $u=(x,y,z)$ et $v=(x',y',z')$, $u\\cdot v=xx'+yy'+zz'$."],["Vecteur normal","Un vecteur non nul normal à un plan est orthogonal à tout vecteur directeur du plan."]],"properties":["$u\\perp v$ si et seulement si $u\\cdot v=0$.","Un plan de normal $(a,b,c)\\ne0$ admet une équation $ax+by+cz+d=0$.","$\\|u\\|=\\sqrt{x^2+y^2+z^2}$. "],"example":"Le plan passant par $A(1,0,2)$ et de normal $(2,-1,3)$ vérifie $2(x-1)-y+3(z-2)=0$.","exerciseId":"term-ex-9","prerequisites":[]},{"id":"term-equations","title":"Polynômes et équations du second degré","category":"Algèbre","level":"Terminale","chapter":"Algèbre","summary":"Factoriser les polynômes simples, résoudre les trinômes et étudier leur signe.","definitions":[["Discriminant","Pour $ax^2+bx+c$ avec $a\\ne0$, $\\Delta=b^2-4ac$."],["Racine","Un réel $r$ est racine de $P$ si $P(r)=0$."]],"properties":["Si $\\Delta>0$, les racines sont $\\frac{-b\\pm\\sqrt\\Delta}{2a}$.","Si $\\Delta=0$, il existe une racine double $-b/(2a)$.","Si $\\Delta<0$, le trinôme garde le signe de $a$. "],"example":"$x^2-5x+6$ a pour racines $2$ et $3$, donc se factorise en $(x-2)(x-3)$.","exerciseId":"term-ex-11","prerequisites":[]}]);
const l1cards=[["limits","Théorème des gendarmes","Si $u_n\\leq v_n\\leq w_n$ et $u_n,w_n\\to\\ell$, alors $v_n\\to\\ell$."],["continuity","Théorème des valeurs intermédiaires","Une fonction continue sur un segment prend toute valeur comprise entre ses valeurs aux bornes."],["derivative","Théorème de Rolle","Continuité sur $[a,b]$, dérivabilité sur $]a,b[$ et $f(a)=f(b)$ impliquent un $c$ tel que $f'(c)=0$."],["integrals","Linéarité de l'intégrale","$\\int(\\lambda f+\\mu g)=\\lambda\\int f+\\mu\\int g$."],["series","Convergence absolue","Si $\\sum|u_n|$ converge, alors $\\sum u_n$ converge."],["vector-spaces","Noyau","Le noyau d'une application linéaire est un sous-espace vectoriel."],["basis","Théorème de la base incomplète","Toute famille libre d'un espace de dimension finie peut être complétée en une base."],["linear-maps","Théorème du rang","$\\dim E=\\dim\\ker f+\\dim\\operatorname{Im}f$."],["matrices","Déterminant d'un produit","$\\det(AB)=\\det(A)\\det(B)$."],["eigenvalues","Indépendance des vecteurs propres","Des vecteurs propres associés à des valeurs propres distinctes sont linéairement indépendants."]];
for(const [id,front,back] of l1cards){const t=window.TOPICS.find(x=>x.id===id);if(t){if(!(id==="continuity"&&t.lessonSections&&t.theorems?.length))t.theorems=[{title:front,statement:back,proof:"Les hypothèses du théorème doivent être vérifiées avant son application. La démonstration complète dépend du cadre du cours et des résultats préalablement établis."}];t.properties.push(front+" : "+back);}}
const guidance={"limits":["Identifier la nature de la limite et les théorèmes applicables.","Ne pas confondre condition nécessaire et suffisante."],"continuity":["Pour le TVI, citer la continuité sur le segment et la valeur cible.","Ne pas appliquer le TVI sans vérifier les hypothèses."],"derivative":["Préciser le domaine de dérivabilité puis étudier le signe de la dérivée.","Un point où $f'=0$ n'est pas nécessairement un extremum."],"integrals":["Vérifier la continuité avant d'utiliser le théorème fondamental.","Ne pas oublier $F(b)-F(a)$."],"series":["Vérifier d'abord que le terme général tend vers zéro.","$u_n\\to0$ ne suffit pas à assurer la convergence de la série."],"vector-spaces":["Tester le vecteur nul et la stabilité par combinaison linéaire.","Ne pas oublier la stabilité par multiplication scalaire."],"basis":["Choisir le critère liberté/génération/cardinal adapté.","Ne pas confondre famille libre et génératrice."],"linear-maps":["Traduire noyau et image en équations.","Vérifier additivité et homogénéité."],"matrices":["Vérifier les dimensions avant chaque produit.","Un coefficient non nul ne suffit pas à prouver l'inversibilité."],"eigenvalues":["Calculer le polynôme caractéristique puis les noyaux propres.","Avoir des valeurs propres ne garantit pas la diagonalisabilité."],"term-sequences":["Établir un intervalle stable avant d'étudier la monotonie.","Ne pas supposer la convergence avant de l'avoir démontrée."],"term-functions":["Étudier le signe de la dérivée avant les variations.","Ne pas confondre le signe de $f'$ avec celui de $f$."],"term-probability":["Identifier le schéma binomial ou la partition.","Ne pas confondre probabilité conditionnelle et intersection."],"term-complex":["Passer à la forme exponentielle pour les puissances.","Vérifier le quadrant et l'argument modulo $2\\pi$."],"term-vectors":["Traduire le plan par l'orthogonalité au normal.","Ne pas confondre vecteur normal et vecteur directeur."],"term-equations":["Calculer le discriminant puis construire le tableau de signes.","Tenir compte du signe du coefficient dominant."]};
for(const t of window.TOPICS){const g=guidance[t.id];if(g){t.methods=[g[0]];t.commonErrors=[g[1]];}}
window.EXERCISES.forEach(e=>{e.level=window.TOPICS.find(t=>t.id===e.topic)?.level||"L1";});
window.EXERCISES.push(...[{"id":"term-ex-1","topic":"term-sequences","category":"Analyse","level":"Terminale","difficulty":"Facile","title":"Suites — limite géométrique","question":"Soit $u_n=7(0,6)^n$. Déterminer sa limite.","hints":["Comparer $|q|$ à $1$."],"answer":"$u_n\\to0$ car $|0,6|<1$.","solutionSteps":["La suite est géométrique de raison $0,6$.","Comme $|0,6|<1$, $0,6^n\\to0$, donc $u_n\\to0$."],"check":"Vérifier les hypothèses de la méthode et contrôler le résultat."},{"id":"term-ex-2","topic":"term-sequences","category":"Analyse","level":"Terminale","difficulty":"Intermédiaire","title":"Suite récurrente — convergence","question":"$u_0=1$ et $u_{n+1}=(u_n+6)/3$. Montrer que la suite converge et déterminer sa limite.","hints":["Montrer par récurrence $1\\leq u_n\\leq3$, puis étudier $u_{n+1}-u_n$."],"answer":"La suite est croissante et majorée par $3$, donc converge. Sa limite vérifie $\\ell=(\\ell+6)/3$, donc $\\ell=3$.","solutionSteps":["Initialisation : $u_0=1$. Si $1\\leq u_n\\leq3$, alors $1\\leq(u_n+6)/3\\leq3$.","$u_{n+1}-u_n=(6-2u_n)/3\\geq0$.","La convergence monotone s'applique ; le passage à la limite donne $3\\ell=\\ell+6$, donc $\\ell=3$."],"check":"Vérifier les hypothèses de la méthode et contrôler le résultat."},{"id":"term-ex-3","topic":"term-functions","category":"Analyse","level":"Terminale","difficulty":"Facile","title":"Dérivée d'un polynôme","question":"Soit $f(x)=2x^3-3x^2+4x-1$. Calculer $f'(x)$.","hints":["Dériver chaque monôme."],"answer":"$f'(x)=6x^2-6x+4$.","solutionSteps":["Dériver terme à terme : $6x^2-6x+4$."],"check":"Vérifier les hypothèses de la méthode et contrôler le résultat."},{"id":"term-ex-4","topic":"term-functions","category":"Analyse","level":"Terminale","difficulty":"Intermédiaire","title":"Variations et minimum","question":"Étudier les variations de $f(x)=x^2-6x+11$.","hints":["Calculer $f'(x)$ et étudier son signe."],"answer":"$f'(x)=2(x-3)$ : décroissante jusqu'à $3$, croissante ensuite ; minimum $f(3)=2$.","solutionSteps":["$f'(x)=2x-6=2(x-3)$.","La dérivée est négative avant $3$, positive après. Le minimum vaut $9-18+11=2$."],"check":"Vérifier les hypothèses de la méthode et contrôler le résultat."},{"id":"term-ex-5","topic":"term-probability","category":"Analyse","level":"Terminale","difficulty":"Facile","title":"Probabilité conditionnelle","question":"$P(A\\cap B)=0,18$ et $P(B)=0,3$. Calculer $P_B(A)$.","hints":["Appliquer la définition."],"answer":"$P_B(A)=0,18/0,3=0,6$.","solutionSteps":["Comme $P(B)>0$, $P_B(A)=P(A\\cap B)/P(B)=0,6$."],"check":"Vérifier les hypothèses de la méthode et contrôler le résultat."},{"id":"term-ex-6","topic":"term-probability","category":"Analyse","level":"Terminale","difficulty":"Intermédiaire","title":"Loi binomiale","question":"Une épreuve de Bernoulli de paramètre $0,2$ est répétée 5 fois indépendamment. Calculer la probabilité d'obtenir deux succès.","hints":["Utiliser la formule binomiale."],"answer":"$P(X=2)=\\binom52(0,2)^2(0,8)^3=0,2048$.","solutionSteps":["$X\\sim\\mathcal B(5;0,2)$.","$P(X=2)=10\\times0,04\\times0,512=0,2048$."],"check":"Vérifier les hypothèses de la méthode et contrôler le résultat."},{"id":"term-ex-7","topic":"term-complex","category":"Algèbre","level":"Terminale","difficulty":"Facile","title":"Calcul avec les complexes","question":"Écrire $(2+3i)+(1-5i)$ sous forme algébrique.","hints":["Additionner séparément les parties réelle et imaginaire."],"answer":"$3-2i$.","solutionSteps":["Partie réelle : $2+1=3$.","Partie imaginaire : $3-5=-2$."],"check":"Vérifier les hypothèses de la méthode et contrôler le résultat."},{"id":"term-ex-8","topic":"term-complex","category":"Algèbre","level":"Terminale","difficulty":"Intermédiaire","title":"Module et argument","question":"Déterminer le module et un argument de $z=-1+i\\sqrt3$.","hints":["Calculer le module puis repérer le quadrant."],"answer":"$|z|=2$ et un argument vaut $2\\pi/3$.","solutionSteps":["$|z|=\\sqrt{1+3}=2$.","Le point est dans le deuxième quadrant avec angle de référence $\\pi/3$."],"check":"Vérifier les hypothèses de la méthode et contrôler le résultat."},{"id":"term-ex-9","topic":"term-vectors","category":"Algèbre","level":"Terminale","difficulty":"Facile","title":"Produit scalaire","question":"Calculer le produit scalaire de $u=(1,2,-1)$ et $v=(3,0,4)$.","hints":["Multiplier les coordonnées correspondantes et additionner."],"answer":"$u\\cdot v=3+0-4=-1$.","solutionSteps":["$u\\cdot v=1\\times3+2\\times0-1\\times4=-1$."],"check":"Vérifier les hypothèses de la méthode et contrôler le résultat."},{"id":"term-ex-10","topic":"term-vectors","category":"Algèbre","level":"Terminale","difficulty":"Intermédiaire","title":"Équation d'un plan","question":"Plan passant par $A(1,2,0)$ et de vecteur normal $n=(2,-1,3)$ : donner son équation.","hints":["Utiliser $n\\cdot\\overrightarrow{AM}=0$."],"answer":"$2(x-1)-(y-2)+3z=0$, soit $2x-y+3z=0$.","solutionSteps":["$\\overrightarrow{AM}=(x-1,y-2,z)$.","L'orthogonalité donne $2(x-1)-(y-2)+3z=0$."],"check":"Vérifier les hypothèses de la méthode et contrôler le résultat."},{"id":"term-ex-11","topic":"term-equations","category":"Algèbre","level":"Terminale","difficulty":"Facile","title":"Discriminant","question":"Résoudre $x^2-5x+6=0$.","hints":["Calculer $\\Delta=b^2-4ac$."],"answer":"$\\Delta=1$, donc $x=2$ ou $x=3$.","solutionSteps":["$\\Delta=25-24=1$.","Les racines sont $(5-1)/2=2$ et $(5+1)/2=3$."],"check":"Vérifier les hypothèses de la méthode et contrôler le résultat."},{"id":"term-ex-12","topic":"term-equations","category":"Algèbre","level":"Terminale","difficulty":"Intermédiaire","title":"Factorisation et signe","question":"Factoriser $2x^2-8x+6$, puis résoudre $2x^2-8x+6\\leq0$.","hints":["Mettre $2$ en facteur."],"answer":"$2(x-1)(x-3)$ ; solution $[1,3]$.","solutionSteps":["$2x^2-8x+6=2(x^2-4x+3)=2(x-1)(x-3)$.","Le coefficient dominant est positif ; le trinôme est négatif entre ses racines."],"check":"Vérifier les hypothèses de la méthode et contrôler le résultat."}]);
window.FLASHCARDS.push(...[{"topic":"limits","front":"Théorème des gendarmes","back":"Si $u_n\\leq v_n\\leq w_n$ et $u_n,w_n\\to\\ell$, alors $v_n\\to\\ell$."},{"topic":"continuity","front":"Théorème des valeurs intermédiaires","back":"Une fonction continue sur un segment prend toute valeur comprise entre ses valeurs aux bornes."},{"topic":"derivative","front":"Théorème de Rolle","back":"Continuité sur $[a,b]$, dérivabilité sur $]a,b[$ et $f(a)=f(b)$ impliquent un $c$ tel que $f'(c)=0$."},{"topic":"integrals","front":"Linéarité de l'intégrale","back":"$\\int(\\lambda f+\\mu g)=\\lambda\\int f+\\mu\\int g$."},{"topic":"series","front":"Convergence absolue","back":"Si $\\sum|u_n|$ converge, alors $\\sum u_n$ converge."},{"topic":"vector-spaces","front":"Noyau","back":"Le noyau d'une application linéaire est un sous-espace vectoriel."},{"topic":"basis","front":"Théorème de la base incomplète","back":"Toute famille libre d'un espace de dimension finie peut être complétée en une base."},{"topic":"linear-maps","front":"Théorème du rang","back":"$\\dim E=\\dim\\ker f+\\dim\\operatorname{Im}f$."},{"topic":"matrices","front":"Déterminant d'un produit","back":"$\\det(AB)=\\det(A)\\det(B)$."},{"topic":"eigenvalues","front":"Indépendance des vecteurs propres","back":"Des vecteurs propres associés à des valeurs propres distinctes sont linéairement indépendants."}]);
window.FLASHCARDS.push(...[{"topic":"term-sequences","front":"Suites numériques — définition essentielle","back":"$(u_n)$ converge vers $\\ell$ si $\\forall\\varepsilon>0$, il existe $N$ tel que $n\\geq N$ entraîne $|u_n-\\ell|<\\varepsilon$."},{"topic":"term-functions","front":"Dérivation et étude de fonctions — définition essentielle","back":"$f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}h$ lorsque cette limite existe."},{"topic":"term-probability","front":"Probabilités et loi binomiale — définition essentielle","back":"Si $P(B)>0$, $P_B(A)=\\frac{P(A\\cap B)}{P(B)}$."},{"topic":"term-complex","front":"Nombres complexes — définition essentielle","back":"Tout complexe s'écrit de façon unique $z=a+ib$, avec $a,b\\in\\mathbb R$ et $i^2=-1$."},{"topic":"term-vectors","front":"Géométrie vectorielle dans l'espace — définition essentielle","back":"Pour $u=(x,y,z)$ et $v=(x',y',z')$, $u\\cdot v=xx'+yy'+zz'$."},{"topic":"term-equations","front":"Polynômes et équations du second degré — définition essentielle","back":"Pour $ax^2+bx+c$ avec $a\\ne0$, $\\Delta=b^2-4ac$."}]);

/* Démonstrations complètes et cartes de mémorisation complémentaires */

const proofMap={"limits":"Soit ε>0. Il existe N1 tel que n≥N1 implique ℓ−ε<u_n, et N2 tel que n≥N2 implique w_n<ℓ+ε. Pour n≥max(N1,N2), l'encadrement donne ℓ−ε<v_n<ℓ+ε. C'est exactement la définition de $v_n\\to\\ell$.","continuity":"Le théorème des valeurs intermédiaires est appliqué à la fonction continue sur le segment. Pour une valeur y entre f(a) et f(b), la fonction g=f−y est continue et change de signe ou s'annule à une extrémité ; le TVI donne c avec g(c)=0, donc f(c)=y.","derivative":"On pose $g(x)=f(x)-\\frac{f(b)-f(a)}{b-a}(x-a)$. La fonction g est continue sur [a,b], dérivable sur ]a,b[ et g(a)=g(b). Par Rolle, il existe c tel que g'(c)=0, ce qui donne $f'(c)=\\frac{f(b)-f(a)}{b-a}$.","integrals":"La linéarité découle de la linéarité de la primitive et du théorème fondamental : une primitive de λf+μg est λF+μG. Alors l'intégrale vaut [λF+μG]ₐᵇ=λ∫f+μ∫g.","series":"Pour m≥n, $|\\sum_{k=n}^m u_k|\\leq\\sum_{k=n}^m|u_k|$. La convergence de la série positive $\\sum|u_k|$ rend ses restes arbitrairement petits. Le critère de Cauchy assure alors la convergence de $\\sum u_k$.","vector-spaces":"On a f(0)=0, donc 0 appartient au noyau. Si x,y sont dans le noyau, alors f(λx+μy)=λf(x)+μf(y)=0 par linéarité. Le noyau est donc non vide et stable par combinaison linéaire.","basis":"On complète une famille libre en une base par le théorème de la base incomplète. La base obtenue possède n vecteurs, puisque dim(E)=n. La famille initiale en possède déjà n ; aucun vecteur n'a donc été ajouté : elle est une base.","linear-maps":"Soit (e₁,…,e_r) une base du noyau, complétée en une base (e₁,…,e_r,e_{r+1},…,e_n) de E. Les images f(e_{r+1}),…,f(e_n) engendrent Im(f). Si une combinaison de ces images est nulle, la combinaison correspondante appartient au noyau ; l'indépendance de la base complète impose que tous les coefficients soient nuls. Ces images forment une base de l'image, de cardinal n−r.","matrices":"Le déterminant est une forme multilinéaire alternée normalisée des colonnes. En exprimant les colonnes de AB comme combinaisons linéaires des colonnes de A, la multilinéarité et l'alternance donnent le facteur det(B), tandis que la transformation par A apporte det(A). On obtient det(AB)=det(A)det(B).","eigenvalues":"On raisonne par récurrence sur le nombre de vecteurs propres. Supposons une relation linéaire nulle entre x₁,…,x_n. En appliquant u−λ_n Id, le terme en x_n disparaît et les autres coefficients sont multipliés par λ_i−λ_n, non nuls. L'hypothèse de récurrence donne la nullité des coefficients pour i<n ; la relation initiale impose alors celui de x_n."};
for(const t of window.TOPICS){if(t.theorems?.length&&proofMap[t.id]&&!(t.id==="continuity"&&Array.isArray(t.lessonSections)))t.theorems[0].proof=proofMap[t.id];}
window.FLASHCARDS.push(...[{"topic":"term-sequences","front":"Formule d'une suite géométrique","back":"$u_n=u_0q^n$ ; si $|q|<1$, alors $u_n\\to0$."},{"topic":"term-sequences","front":"Suite monotone et bornée","back":"Une suite croissante et majorée (ou décroissante et minorée) converge."},{"topic":"term-functions","front":"Signe de la dérivée","back":"Si $f'\\geq0$ sur un intervalle, $f$ y est croissante."},{"topic":"term-functions","front":"Tangente au point d'abscisse a","back":"$y=f(a)+f'(a)(x-a)$."},{"topic":"term-probability","front":"Formule binomiale","back":"$P(X=k)=\\binom nkp^k(1-p)^{n-k}$."},{"topic":"term-probability","front":"Espérance binomiale","back":"Si $X\\sim\\mathcal B(n,p)$, alors $E(X)=np$."},{"topic":"term-complex","front":"Module d'un complexe","back":"$|a+ib|=\\sqrt{a^2+b^2}$."},{"topic":"term-complex","front":"Formule de Moivre","back":"$(\\cos\\theta+i\\sin\\theta)^n=\\cos(n\\theta)+i\\sin(n\\theta)$."},{"topic":"term-vectors","front":"Produit scalaire","back":"$u\\cdot v=xx'+yy'+zz'$."},{"topic":"term-vectors","front":"Plan et vecteur normal","back":"$M$ appartient au plan passant par $A$ et de normal $n$ si $n\\cdot\\overrightarrow{AM}=0$."},{"topic":"term-equations","front":"Discriminant","back":"$\\Delta=b^2-4ac$."},{"topic":"term-equations","front":"Signe d'un trinôme","back":"Si $\\Delta<0$, le trinôme garde le signe de son coefficient dominant."}]);

/* Théorèmes du programme de Terminale avec démonstrations */

const tt={"term-sequences":{"title":"Théorème de convergence monotone","statement":"Toute suite réelle croissante et majorée converge.","proof":"Posons $\\ell=\\sup\\{u_n:n\\in\\mathbb N\\}$. Pour tout $\\varepsilon>0$, la définition du supremum fournit un rang $N$ tel que $u_N>\\ell-\\varepsilon$. Pour tout $n\\geq N$, la croissance donne $\\ell-\\varepsilon<u_N\\leq u_n\\leq\\ell$. Ainsi $|u_n-\\ell|<\\varepsilon$ et la suite converge vers $\\ell$."},"term-functions":{"title":"Théorème de monotonie","statement":"Si $f$ est dérivable sur un intervalle $I$ et $f'(x)\\geq0$ sur $I$, alors $f$ est croissante sur $I$.","proof":"Soient $a<b$ dans $I$. Le théorème des accroissements finis donne $c\\in]a,b[$ tel que $f(b)-f(a)=f'(c)(b-a)$. Les deux facteurs du membre de droite sont positifs ou nuls, donc $f(b)\\geq f(a)$."},"term-probability":{"title":"Formule des probabilités totales","statement":"Si $(B_1,\\ldots,B_n)$ est une partition de l'univers et si $P(B_i)>0$, alors $P(A)=\\sum_iP(B_i)P_{B_i}(A)$.","proof":"Les événements $A\\cap B_i$ sont deux à deux incompatibles et leur réunion est $A$. Par additivité, $P(A)=\\sum_iP(A\\cap B_i)$. Or $P(A\\cap B_i)=P(B_i)P_{B_i}(A)$ par définition de la probabilité conditionnelle."},"term-complex":{"title":"Formule de Moivre","statement":"Pour tout entier $n$, $(\\cos\\theta+i\\sin\\theta)^n=\\cos(n\\theta)+i\\sin(n\\theta)$.","proof":"Pour $n\\geq0$, l'initialisation est immédiate. Si la formule est vraie au rang $n$, multiplier par $\\cos\\theta+i\\sin\\theta$ et utiliser les formules d'addition donne le rang $n+1$. Pour $n<0$, on utilise l'inverse, qui vaut $\\cos(-\\theta)+i\\sin(-\\theta)$."},"term-vectors":{"title":"Équation cartésienne d'un plan","statement":"Le plan passant par $A$ et de vecteur normal $n$ est l'ensemble des points $M$ tels que $n\\cdot\\overrightarrow{AM}=0$.","proof":"Par définition, $M$ appartient au plan si et seulement si le vecteur $\\overrightarrow{AM}$ est orthogonal au vecteur normal $n$. Cette orthogonalité équivaut à l'annulation du produit scalaire."},"term-equations":{"title":"Critère du discriminant","statement":"Pour $ax^2+bx+c=0$ avec $a\\ne0$, le signe de $\\Delta=b^2-4ac$ détermine le nombre de racines réelles.","proof":"On complète le carré : $ax^2+bx+c=a[(x+b/(2a))^2-\\Delta/(4a^2)]$. L'équation revient à $(2ax+b)^2=\\Delta$. Elle possède deux solutions si $\\Delta>0$, une solution double si $\\Delta=0$ et aucune solution réelle si $\\Delta<0$."}};
for(const [id,th] of Object.entries(tt)){const t=window.TOPICS.find(x=>x.id===id);if(t)t.theorems=[th];}
window.FLASHCARDS.push(...[{"topic":"term-sequences","front":"Théorème de convergence monotone","back":"Toute suite réelle croissante et majorée converge. Démonstration : Posons $\\ell=\\sup\\{u_n:n\\in\\mathbb N\\}$. Pour tout $\\varepsilon>0$, la définition du supremum fournit un rang $N$ tel que $u_N>\\ell-\\varepsilon$. Pour tout $n\\geq N$, la croissance donne $\\ell-\\varepsilon<u_N\\leq u_n\\leq\\ell$. Ainsi $|u_n-\\ell|<\\varepsilon$ et la suite converge vers $\\ell$."},{"topic":"term-functions","front":"Théorème de monotonie","back":"Si $f$ est dérivable sur un intervalle $I$ et $f'(x)\\geq0$ sur $I$, alors $f$ est croissante sur $I$. Démonstration : Soient $a<b$ dans $I$. Le théorème des accroissements finis donne $c\\in]a,b[$ tel que $f(b)-f(a)=f'(c)(b-a)$. Les deux facteurs du membre de droite sont positifs ou nuls, donc $f(b)\\geq f(a)$."},{"topic":"term-probability","front":"Formule des probabilités totales","back":"Si $(B_1,\\ldots,B_n)$ est une partition de l'univers et si $P(B_i)>0$, alors $P(A)=\\sum_iP(B_i)P_{B_i}(A)$. Démonstration : Les événements $A\\cap B_i$ sont deux à deux incompatibles et leur réunion est $A$. Par additivité, $P(A)=\\sum_iP(A\\cap B_i)$. Or $P(A\\cap B_i)=P(B_i)P_{B_i}(A)$ par définition de la probabilité conditionnelle."},{"topic":"term-complex","front":"Formule de Moivre","back":"Pour tout entier $n$, $(\\cos\\theta+i\\sin\\theta)^n=\\cos(n\\theta)+i\\sin(n\\theta)$. Démonstration : Pour $n\\geq0$, l'initialisation est immédiate. Si la formule est vraie au rang $n$, multiplier par $\\cos\\theta+i\\sin\\theta$ et utiliser les formules d'addition donne le rang $n+1$. Pour $n<0$, on utilise l'inverse, qui vaut $\\cos(-\\theta)+i\\sin(-\\theta)$."},{"topic":"term-vectors","front":"Équation cartésienne d'un plan","back":"Le plan passant par $A$ et de vecteur normal $n$ est l'ensemble des points $M$ tels que $n\\cdot\\overrightarrow{AM}=0$. Démonstration : Par définition, $M$ appartient au plan si et seulement si le vecteur $\\overrightarrow{AM}$ est orthogonal au vecteur normal $n$. Cette orthogonalité équivaut à l'annulation du produit scalaire."},{"topic":"term-equations","front":"Critère du discriminant","back":"Pour $ax^2+bx+c=0$ avec $a\\ne0$, le signe de $\\Delta=b^2-4ac$ détermine le nombre de racines réelles. Démonstration : On complète le carré : $ax^2+bx+c=a[(x+b/(2a))^2-\\Delta/(4a^2)]$. L'équation revient à $(2ax+b)^2=\\Delta$. Elle possède deux solutions si $\\Delta>0$, une solution double si $\\Delta=0$ et aucune solution réelle si $\\Delta<0$."}]);

/* Exercices avancés de Terminale : un par chapitre */

window.EXERCISES.push(...[{"id":"term-ex-13","topic":"term-sequences","category":"Analyse","level":"Terminale","difficulty":"Avancé","title":"Somme des termes d'une suite géométrique","question":"Pour $n\\geq0$, calculer $S_n=\\sum_{k=0}^{n}3(1/2)^k$, puis déterminer sa limite.","hints":["Utiliser la formule de somme géométrique."],"answer":"$S_n=6(1-2^{-(n+1)})$, donc $S_n\\to6$.","solutionSteps":["La somme est géométrique de premier terme $3$ et de raison $1/2$.","$S_n=3\\frac{1-(1/2)^{n+1}}{1-1/2}=6(1-2^{-(n+1)})$.","Comme $2^{-(n+1)}\\to0$, la limite vaut $6$."]},{"id":"term-ex-14","topic":"term-functions","category":"Analyse","level":"Terminale","difficulty":"Avancé","title":"Tangente et position relative","question":"Soit $f(x)=x^2+2x$. Déterminer la tangente en $x=1$, puis étudier la position de la courbe par rapport à cette tangente.","hints":["Calculer $f(1)$ et $f'(1)$, puis factoriser la différence."],"answer":"La tangente est $y=4x-1$. De plus $f(x)-(4x-1)=(x-1)^2\\geq0$ : la courbe est au-dessus de sa tangente.","solutionSteps":["$f(1)=3$ et $f'(x)=2x+2$, donc $f'(1)=4$. La tangente est $y=3+4(x-1)=4x-1$.","La différence vaut $x^2+2x-(4x-1)=(x-1)^2$.","Cette quantité est positive ou nulle pour tout réel : la courbe est au-dessus de la tangente."]},{"id":"term-ex-15","topic":"term-probability","category":"Analyse","level":"Terminale","difficulty":"Avancé","title":"Probabilités totales","question":"Une usine utilise deux machines. $P(M_1)=0,6$, $P(M_2)=0,4$, $P(D|M_1)=0,02$ et $P(D|M_2)=0,05$. Calculer la probabilité qu'une pièce soit défectueuse.","hints":["Les événements $M_1$ et $M_2$ forment une partition."],"answer":"$P(D)=0,6\\times0,02+0,4\\times0,05=0,032$, soit $3,2\\%$.","solutionSteps":["Les événements $M_1$ et $M_2$ forment une partition de l'univers.","Par la formule des probabilités totales, $P(D)=P(M_1)P(D|M_1)+P(M_2)P(D|M_2)$.","On obtient $0,012+0,020=0,032$."]},{"id":"term-ex-16","topic":"term-complex","category":"Algèbre","level":"Terminale","difficulty":"Avancé","title":"Forme exponentielle et puissance","question":"Écrire $z=1+i$ sous forme exponentielle puis calculer $z^8$.","hints":["Déterminer le module et un argument, puis appliquer la formule de Moivre."],"answer":"$z=\\sqrt2e^{i\\pi/4}$ et $z^8=16e^{i2\\pi}=16$.","solutionSteps":["Le module vaut $\\sqrt2$ et un argument vaut $\\pi/4$.","Ainsi $z=\\sqrt2e^{i\\pi/4}$.","Donc $z^8=(\\sqrt2)^8e^{i8\\pi/4}=16e^{i2\\pi}=16$."]},{"id":"term-ex-17","topic":"term-vectors","category":"Algèbre","level":"Terminale","difficulty":"Avancé","title":"Plan défini par un point et un vecteur normal","question":"Déterminer l'équation du plan passant par $A(2,-1,3)$ et de vecteur normal $n=(1,2,-2)$, puis vérifier si $B(0,0,2)$ appartient au plan.","hints":["Écrire $n\\cdot\\overrightarrow{AM}=0$, puis tester les coordonnées de B."],"answer":"Le plan a pour équation $x+2y-2z+6=0$. Pour B, $0+0-4+6=2\\ne0$ : B n'appartient pas au plan.","solutionSteps":["Pour $M(x,y,z)$, $\\overrightarrow{AM}=(x-2,y+1,z-3)$.","L'équation est $(x-2)+2(y+1)-2(z-3)=0$, soit $x+2y-2z+6=0$.","En B, le membre de gauche vaut $2$, donc B n'appartient pas au plan."]},{"id":"term-ex-18","topic":"term-equations","category":"Algèbre","level":"Terminale","difficulty":"Avancé","title":"Paramètre et nombre de racines","question":"Selon les valeurs du réel $m$, déterminer le nombre de solutions réelles de $x^2-2mx+m+2=0$.","hints":["Étudier le signe de $\\Delta=4(m^2-m-2)$."],"answer":"$\\Delta=4(m-2)(m+1)$. Deux racines si $m<-1$ ou $m>2$, une racine double si $m=-1$ ou $m=2$, aucune si $-1<m<2$.","solutionSteps":["$\\Delta=(-2m)^2-4(m+2)=4(m^2-m-2)$.","On factorise : $\\Delta=4(m-2)(m+1)$.","Le discriminant est positif hors de $[-1,2]$, nul aux bornes et négatif entre les bornes. On applique le critère du discriminant."]}]);

/* Renfort des chapitres L1 insuffisamment dotés en exercices */
window.EXERCISES.push(...[{"id":"l1-basis-1","topic":"basis","category":"Algèbre","level":"L1","difficulty":"Facile","title":"Tester une base de R²","question":"Montrer que $B=((1,1),(1,-1))$ est une base de $\\mathbb R^2$.","hints":["Montrer que les deux vecteurs sont linéairement indépendants."],"answer":"Si $\\lambda(1,1)+\\mu(1,-1)=(0,0)$, alors $\\lambda+\\mu=0$ et $\\lambda-\\mu=0$, donc $\\lambda=\\mu=0$. La famille libre de deux vecteurs dans $\\mathbb R^2$ est une base.","solutionSteps":["Supposons $\\lambda(1,1)+\\mu(1,-1)=(0,0)$.","On obtient le système $\\lambda+\\mu=0$ et $\\lambda-\\mu=0$. En additionnant puis en soustrayant, $\\lambda=\\mu=0$.","La famille est libre et contient deux vecteurs dans un espace de dimension 2 : c'est une base."]},{"id":"l1-basis-2","topic":"basis","category":"Algèbre","level":"L1","difficulty":"Intermédiaire","title":"Coordonnées dans une base","question":"Dans la base $B=((1,1),(1,-1))$ de $\\mathbb R^2$, déterminer les coordonnées de $v=(4,2)$.","hints":["Chercher $a,b$ tels que $a(1,1)+b(1,-1)=(4,2)$. "],"answer":"Le système $a+b=4$, $a-b=2$ donne $a=3$ et $b=1$. Les coordonnées sont $(3,1)_B$.","solutionSteps":["Écrire $v=a(1,1)+b(1,-1)$.","L'identification des coordonnées donne $a+b=4$ et $a-b=2$.","On trouve $a=3$, $b=1$."]},{"id":"l1-basis-3","topic":"basis","category":"Algèbre","level":"L1","difficulty":"Avancé","title":"Famille libre et dimension","question":"Dans $\\mathbb R^2$, étudier la liberté de la famille $((1,0),(0,1),(1,1))$ et en extraire une base.","hints":["Exprimer le troisième vecteur comme combinaison des deux premiers."],"answer":"La famille est liée car $(1,1)=(1,0)+(0,1)$. Les deux premiers vecteurs forment une base canonique de $\\mathbb R^2$.","solutionSteps":["On observe la relation non triviale $v_1+v_2-v_3=0$.","La famille de trois vecteurs est donc liée.","Les deux premiers vecteurs sont libres et engendrent $\\mathbb R^2$ : ils forment une base."]},{"id":"l1-series-1","topic":"series","category":"Analyse","level":"L1","difficulty":"Facile","title":"Série géométrique","question":"Étudier la convergence de $\\sum_{n=0}^{\\infty}(2/3)^n$ et calculer sa somme.","hints":["Reconnaître une série géométrique de raison $q=2/3$."],"answer":"Comme $|2/3|<1$, la série converge et sa somme vaut $1/(1-2/3)=3$.","solutionSteps":["La série est géométrique de premier terme 1 et de raison $q=2/3$.","Puisque $|q|<1$, elle converge.","Sa somme vaut $1/(1-q)=3$."]},{"id":"l1-series-2","topic":"series","category":"Analyse","level":"L1","difficulty":"Avancé","title":"Condition nécessaire et divergence","question":"Montrer que la série harmonique $\\sum_{n=1}^{\\infty}1/n$ diverge, bien que son terme général tende vers 0.","hints":["Regrouper les termes par blocs dyadiques : de $2^k$ à $2^{k+1}-1$."],"answer":"Chaque bloc $\\sum_{n=2^k}^{2^{k+1}-1}1/n$ contient $2^k$ termes tous au moins égaux à $1/2^{k+1}$, donc sa somme est au moins $1/2$. Les sommes partielles sont donc non bornées : la série diverge.","solutionSteps":["Pour tout $k\\geq0$, le bloc de $2^k$ à $2^{k+1}-1$ contient $2^k$ termes.","Chaque terme du bloc est au moins $1/2^{k+1}$, donc le bloc a une somme au moins égale à $1/2$.","En additionnant un nombre arbitraire de blocs, les sommes partielles deviennent arbitrairement grandes. La série diverge."]},{"id":"l1-matrix-1","topic":"matrices","category":"Algèbre","level":"L1","difficulty":"Facile","title":"Déterminant et inversibilité","question":"Calculer le déterminant de $A=\\begin{pmatrix}2&1\\\\3&2\\end{pmatrix}$ et dire si $A$ est inversible.","hints":["Pour une matrice 2×2, $\\det A=ad-bc$."],"answer":"$\\det A=2\\times2-1\\times3=1\\ne0$, donc $A$ est inversible.","solutionSteps":["Pour $A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$, $\\det A=ad-bc$.","Ici $\\det A=4-3=1$.","Le déterminant est non nul : $A$ est inversible."]},{"id":"l1-matrix-2","topic":"matrices","category":"Algèbre","level":"L1","difficulty":"Intermédiaire","title":"Calculer une matrice inverse","question":"Déterminer l'inverse de $A=\\begin{pmatrix}2&1\\\\3&2\\end{pmatrix}$.","hints":["Utiliser la formule de l'inverse d'une matrice 2×2."],"answer":"$\\det A=1$, donc $A^{-1}=\\begin{pmatrix}2&-1\\\\-3&2\\end{pmatrix}$.","solutionSteps":["Le déterminant vaut $1$.","La formule donne $A^{-1}=\\frac1{ad-bc}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}$.","On obtient $A^{-1}=\\begin{pmatrix}2&-1\\\\-3&2\\end{pmatrix}$."]},{"id":"l1-matrix-3","topic":"matrices","category":"Algèbre","level":"L1","difficulty":"Avancé","title":"Résoudre un système par inversion","question":"Résoudre le système $2x+y=5$, $3x+2y=8$ à l'aide d'une écriture matricielle.","hints":["Écrire $AX=B$, puis utiliser l'inverse de $A$."],"answer":"Le système donne $x=2$, $y=1$.","solutionSteps":["Écrire $A=\\begin{pmatrix}2&1\\\\3&2\\end{pmatrix}$, $X=\\begin{pmatrix}x\\\\y\\end{pmatrix}$ et $B=\\begin{pmatrix}5\\\\8\\end{pmatrix}$.","Comme $A^{-1}=\\begin{pmatrix}2&-1\\\\-3&2\\end{pmatrix}$, on a $X=A^{-1}B$.","Le calcul donne $X=\\begin{pmatrix}10-8\\\\-15+16\\end{pmatrix}=\\begin{pmatrix}2\\\\1\\end{pmatrix}$."]}]);

/* Deuxième théorème fondamental pour chaque chapitre L1 */

const extraL1Theorems={"limits":{"title":"Unicité de la limite","statement":"Une suite réelle ne peut converger vers deux limites distinctes.","proof":"Supposons $u_n\\to\\ell$ et $u_n\\to m$ avec $\\ell\\ne m$. Posons $\\varepsilon=|\\ell-m|/3$. Pour n assez grand, $|u_n-\\ell|<\\varepsilon$ et $|u_n-m|<\\varepsilon$. L'inégalité triangulaire donne $|\\ell-m|<2|\\ell-m|/3$, contradiction."},"continuity":{"title":"Continuité d'une composée","statement":"Si $f$ est continue en $a$ et $g$ continue en $f(a)$, alors $g\\circ f$ est continue en $a$.","proof":"Soit $\\varepsilon>0$. La continuité de $g$ en $f(a)$ fournit $\\eta>0$ tel que $|y-f(a)|<\\eta$ entraîne $|g(y)-g(f(a))|<\\varepsilon$. La continuité de $f$ fournit alors $\\delta>0$ tel que $|x-a|<\\delta$ entraîne $|f(x)-f(a)|<\\eta$. On obtient la continuité de la composée."},"derivative":{"title":"Dérivée d'un produit","statement":"Si $u$ et $v$ sont dérivables en $a$, alors $(uv)'(a)=u'(a)v(a)+u(a)v'(a)$.","proof":"Écrire $u(a+h)v(a+h)-u(a)v(a)=u(a+h)(v(a+h)-v(a))+v(a)(u(a+h)-u(a))$. Diviser par $h$, puis faire tendre $h$ vers zéro. La continuité de $u$ en $a$ permet de conclure."},"integrals":{"title":"Intégration par parties","statement":"Pour $u,v\\in C^1([a,b])$, $\\int_a^b u(x)v'(x)dx=[uv]_a^b-\\int_a^b u'(x)v(x)dx$.","proof":"Le produit $uv$ est de classe $C^1$ et $(uv)'=u'v+uv'$. En intégrant cette égalité sur $[a,b]$ puis en appliquant le théorème fondamental, on isole l'intégrale de $uv'$."},"series":{"title":"Critère de comparaison","statement":"Si $0\\leq u_n\\leq v_n$ à partir d'un certain rang et si $\\sum v_n$ converge, alors $\\sum u_n$ converge.","proof":"Les sommes partielles de la série $\\sum u_n$ sont croissantes à partir du rang considéré et majorées par les sommes partielles correspondantes de $\\sum v_n$, qui sont bornées. Elles convergent donc ; la série $\\sum u_n$ converge."},"vector-spaces":{"title":"Intersection de sous-espaces","statement":"L'intersection de sous-espaces vectoriels d'un même espace est un sous-espace vectoriel.","proof":"L'intersection contient le vecteur nul. Si x et y appartiennent à l'intersection, ils appartiennent à chaque sous-espace ; toute combinaison linéaire λx+μy appartient donc à chacun d'eux, et ainsi à l'intersection."},"basis":{"title":"Critère générateur en dimension n","statement":"Dans un espace vectoriel de dimension n, toute famille génératrice de n vecteurs est une base.","proof":"Le théorème de Steinitz implique qu'une famille libre et une famille génératrice d'un espace de dimension n ont au plus et au moins n éléments respectivement. Une famille génératrice de n vecteurs ne peut être liée, car on pourrait alors supprimer un vecteur et obtenir une famille génératrice de n−1 vecteurs, contradiction avec la dimension."},"linear-maps":{"title":"Injectivité et noyau","statement":"Une application linéaire f est injective si et seulement si $\\ker f=\\{0\\}$.","proof":"Si f est injective et f(x)=0=f(0), alors x=0. Réciproquement, si le noyau est nul et f(x)=f(y), alors f(x−y)=0 par linéarité ; donc x−y=0 et x=y."},"matrices":{"title":"Critère d'inversibilité par le déterminant","statement":"Une matrice carrée A est inversible si et seulement si $\\det(A)\\ne0$.","proof":"Le déterminant est non nul si et seulement si les colonnes de A sont linéairement indépendantes. En dimension n, n colonnes indépendantes forment une base ; l'application linéaire associée est bijective, donc A est inversible."},"eigenvalues":{"title":"Indépendance des vecteurs propres distincts","statement":"Des vecteurs propres associés à des valeurs propres deux à deux distinctes sont linéairement indépendants.","proof":"Raisonnons par récurrence. Pour une relation nulle entre x₁,…,xₙ, appliquer u−λₙId élimine xₙ. Les coefficients restants sont multipliés par λᵢ−λₙ, non nuls. L'hypothèse de récurrence impose leur nullité, puis la relation initiale impose le dernier coefficient nul."}};
for(const [id,t] of Object.entries(extraL1Theorems)){const topic=window.TOPICS.find(x=>x.id===id);if(topic)topic.theorems=[...(topic.theorems||[]),t];}
window.FLASHCARDS.push(...[{"topic":"limits","front":"Unicité de la limite","back":"Une suite réelle ne peut converger vers deux limites distinctes."},{"topic":"continuity","front":"Continuité d'une composée","back":"Si $f$ est continue en $a$ et $g$ continue en $f(a)$, alors $g\\circ f$ est continue en $a$."},{"topic":"derivative","front":"Dérivée d'un produit","back":"Si $u$ et $v$ sont dérivables en $a$, alors $(uv)'(a)=u'(a)v(a)+u(a)v'(a)$."},{"topic":"integrals","front":"Intégration par parties","back":"Pour $u,v\\in C^1([a,b])$, $\\int_a^b u(x)v'(x)dx=[uv]_a^b-\\int_a^b u'(x)v(x)dx$."},{"topic":"series","front":"Critère de comparaison","back":"Si $0\\leq u_n\\leq v_n$ à partir d'un certain rang et si $\\sum v_n$ converge, alors $\\sum u_n$ converge."},{"topic":"vector-spaces","front":"Intersection de sous-espaces","back":"L'intersection de sous-espaces vectoriels d'un même espace est un sous-espace vectoriel."},{"topic":"basis","front":"Critère générateur en dimension n","back":"Dans un espace vectoriel de dimension n, toute famille génératrice de n vecteurs est une base."},{"topic":"linear-maps","front":"Injectivité et noyau","back":"Une application linéaire f est injective si et seulement si $\\ker f=\\{0\\}$."},{"topic":"matrices","front":"Critère d'inversibilité par le déterminant","back":"Une matrice carrée A est inversible si et seulement si $\\det(A)\\ne0$."},{"topic":"eigenvalues","front":"Indépendance des vecteurs propres distincts","back":"Des vecteurs propres associés à des valeurs propres deux à deux distinctes sont linéairement indépendants."}]);

/* Éviter de répéter les énoncés des théorèmes dans la liste des propriétés */

for(const t of window.TOPICS){if(t.theorems?.length)t.properties=t.properties.filter(p=>!t.theorems.some(th=>p.startsWith(th.title+" : ")));}


window.EXERCISES.push(
{id:"l2-multi-1",topic:"multivariable",category:"Analyse",level:"L2",difficulty:"Facile",title:"Dérivées partielles d'un polynôme",question:"Soit $f(x,y)=x^2y+3xy^2$. Calculer $\\partial f/\\partial x$ et $\\partial f/\\partial y$.",hints:["Pour $\\partial f/\\partial x$, considère $y$ comme une constante.","Pour $\\partial f/\\partial y$, considère $x$ comme une constante."],answer:"On obtient $\\boxed{\\partial_x f=2xy+3y^2}$ et $\\boxed{\\partial_y f=x^2+6xy}$.",solutionSteps:["Pour dériver par rapport à $x$, on considère $y$ comme constant : $(x^2y)'_x=2xy$ et $(3xy^2)'_x=3y^2$.","Ainsi $\\partial_x f(x,y)=2xy+3y^2$.","Pour dériver par rapport à $y$, on considère $x$ comme constant : $(x^2y)'_y=x^2$ et $(3xy^2)'_y=6xy$.","Ainsi $\\partial_y f(x,y)=x^2+6xy$."],check:"Dans chaque dérivée partielle, vérifie que l'autre variable a bien été traitée comme une constante."},
{id:"l2-multi-2",topic:"multivariable",category:"Analyse",level:"L2",difficulty:"Intermédiaire",title:"Gradient et point critique",question:"Déterminer les points critiques de $f(x,y)=x^2+2y^2-4x+8y$.",hints:["Calcule les deux dérivées partielles premières.","Résous le système $\\partial_x f=0$ et $\\partial_y f=0$."],answer:"Le gradient s'annule uniquement en $(2,-2)$ : c'est l'unique point critique.",solutionSteps:["On calcule $\\partial_x f=2x-4$ et $\\partial_y f=4y+8$.","Un point critique vérifie $2x-4=0$ et $4y+8=0$.","On obtient $x=2$ et $y=-2$.","Le seul point critique est donc $\\boxed{(2,-2)}$."],check:"Un point critique intérieur doit annuler simultanément toutes les dérivées partielles premières."},
{id:"l2-multi-3",topic:"multivariable",category:"Analyse",level:"L2",difficulty:"Avancé",title:"Nature d'un point critique",question:"Étudier la nature du point critique de $f(x,y)=x^2-y^2$ en $(0,0)$.",hints:["Vérifie d'abord que le gradient s'annule en $(0,0)$.","Compare les valeurs de $f$ sur les axes $y=0$ et $x=0$."],answer:"L'origine est un point selle : la fonction prend des valeurs positives et négatives arbitrairement près de l'origine.",solutionSteps:["On a $\\partial_x f=2x$ et $\\partial_y f=-2y$, donc le gradient s'annule en $(0,0)$.","Sur l'axe $y=0$, $f(x,0)=x^2>0$ pour $x\\ne0$.","Sur l'axe $x=0$, $f(0,y)=-y^2<0$ pour $y\\ne0$.","Dans tout voisinage de l'origine, la fonction prend donc des valeurs supérieures et inférieures à $f(0,0)=0$. L'origine est un point selle."],check:"Pour exclure un extremum local, trouve des valeurs supérieures et inférieures à la valeur au point dans tout voisinage."},
{id:"l2-multi-4",topic:"multivariable",category:"Analyse",level:"L2",difficulty:"Intermédiaire",title:"Matrice hessienne",question:"Calculer la matrice hessienne de $f(x,y)=x^2+3xy+2y^2$ et déterminer son déterminant.",hints:["Calcule d'abord les dérivées partielles secondes.","La matrice hessienne est symétrique pour ce polynôme."],answer:"La hessienne est $H_f=\\begin{pmatrix}2&3\\\\3&4\\end{pmatrix}$ et son déterminant vaut $8-9=-1$.",solutionSteps:["Les dérivées premières sont $f_x=2x+3y$ et $f_y=3x+4y$.","Les dérivées secondes sont $f_{xx}=2$, $f_{xy}=3$, $f_{yx}=3$ et $f_{yy}=4$.","La matrice hessienne est donc $H_f=\\begin{pmatrix}2&3\\\\3&4\\end{pmatrix}$.","Son déterminant vaut $2\\times4-3\\times3=8-9=-1$."],check:"Place les dérivées secondes dans le bon ordre et vérifie le déterminant avec la formule ad−bc."}
);


// ─────────────────────────────────────────────────────────────────────────────
// Mathevo — Enrichissement pédagogique du chapitre L1 « Limites et convergence »
// Ajout ciblé : définitions, théorèmes démontrés, méthodes, erreurs fréquentes,
// exercices progressifs et cartes de révision. Aucun contenu existant n'est écrasé.
// ─────────────────────────────────────────────────────────────────────────────
(() => {
  const chapter = window.TOPICS.find(t => t.id === "limits");
  if (!chapter) return;

  chapter.definitions = [
    ...chapter.definitions,
    ["Suite majorée", "Une suite $(u_n)$ est majorée s'il existe $M\\in\\mathbb R$ tel que, pour tout $n$, $u_n\\leq M$."],
    ["Suite minorée", "Une suite $(u_n)$ est minorée s'il existe $m\\in\\mathbb R$ tel que, pour tout $n$, $u_n\\geq m$."],
    ["Suite bornée", "Une suite est bornée si elle est à la fois majorée et minorée."],
    ["Suite croissante", "Une suite est croissante lorsque, pour tout $n$, $u_{n+1}\\geq u_n$."],
    ["Suite décroissante", "Une suite est décroissante lorsque, pour tout $n$, $u_{n+1}\\leq u_n$."]
  ];

  chapter.properties = [
    ...chapter.properties,
    "Une suite convergente est bornée.",
    "La limite d'une suite convergente est unique.",
    "Toute suite croissante et majorée converge.",
    "Toute suite décroissante et minorée converge.",
    "Si $u_n\\leq v_n$ à partir d'un certain rang et si les deux suites convergent, alors $\\lim u_n\\leq\\lim v_n$.",
    "Si $u_n\\leq v_n\\leq w_n$ à partir d'un certain rang et si $u_n$ et $w_n$ convergent vers la même limite $\\ell$, alors $v_n\\to\\ell$."
  ];

  chapter.theorems = [
    {
      title: "Unicité de la limite",
      statement: "Une suite réelle ne peut pas converger vers deux limites distinctes.",
      proof: "Supposons que $u_n\\to\\ell$ et $u_n\\to m$. Pour tout $n$, l'inégalité triangulaire donne $|\\ell-m|\\leq|\\ell-u_n|+|u_n-m|$. En faisant tendre $n$ vers l'infini, les deux termes du membre de droite tendent vers $0$. Ainsi $|\\ell-m|=0$, donc $\\ell=m$."
    },
    {
      title: "Une suite convergente est bornée",
      statement: "Toute suite réelle convergente est bornée.",
      proof: "Supposons $u_n\\to\\ell$. En prenant $\\varepsilon=1$ dans la définition, il existe $N$ tel que $n\\geq N$ implique $|u_n-\\ell|<1$, donc $|u_n|<|\\ell|+1$. Les termes à partir du rang $N$ sont donc bornés. Les termes $u_0,\\ldots,u_{N-1}$ sont en nombre fini : leur valeur absolue admet un maximum. En prenant le maximum de ces deux bornes, toute la suite est bornée."
    },
    {
      title: "Théorème de convergence monotone (version croissante)",
      statement: "Toute suite réelle croissante et majorée converge. Sa limite est la borne supérieure de l'ensemble de ses termes.",
      proof: "Soit $A=\\{u_n:n\\in\\mathbb N\\}$. L'ensemble $A$ est non vide et majoré. Par complétude de $\\mathbb R$, il possède une borne supérieure $\\ell=\\sup A$. Soit $\\varepsilon>0$. Par définition du supremum, il existe un rang $N$ tel que $\\ell-\\varepsilon<u_N\\leq\\ell$. Comme la suite est croissante, pour tout $n\\geq N$, $\\ell-\\varepsilon<u_N\\leq u_n\\leq\\ell$. Donc $|u_n-\\ell|<\\varepsilon$ et $u_n\\to\\ell$."
    },
    {
      title: "Théorème des gendarmes",
      statement: "Si $u_n\\leq v_n\\leq w_n$ à partir d'un certain rang et si $u_n\\to\\ell$ et $w_n\\to\\ell$, alors $v_n\\to\\ell$.",
      proof: "Soit $\\varepsilon>0$. Comme $u_n\\to\\ell$, à partir d'un certain rang $u_n>\\ell-\\varepsilon$. Comme $w_n\\to\\ell$, à partir d'un certain rang $w_n<\\ell+\\varepsilon$. En prenant un rang supérieur aux trois rangs concernés, on obtient $\\ell-\\varepsilon<u_n\\leq v_n\\leq w_n<\\ell+\\varepsilon$. Ainsi $|v_n-\\ell|<\\varepsilon$, ce qui prouve $v_n\\to\\ell$."
    }
  ];

  chapter.methods = [
    "Pour une suite explicite, commencer par identifier le terme dominant ou transformer l'expression, puis vérifier si une preuve par encadrement est nécessaire.",
    "Pour démontrer $u_n\\to\\ell$ avec la définition, calculer $|u_n-\\ell|$, le majorer par une expression simple, puis choisir $N$ en fonction de $\\varepsilon$.",
    "Pour une suite récurrente, chercher d'abord un intervalle stable, puis étudier la monotonie avant d'utiliser le théorème de convergence monotone.",
    "Pour une expression oscillante, chercher un encadrement par deux suites qui ont la même limite.",
    "Pour établir une inégalité entre limites, conserver le sens de l'inégalité et vérifier qu'elle est vraie à partir d'un certain rang."
  ];

  chapter.commonErrors = [
    "Confondre suite bornée et suite convergente : la suite $((-1)^n)$ est bornée mais ne converge pas.",
    "Utiliser le théorème de convergence monotone sans avoir établi à la fois la monotonie et la bonne borne.",
    "Passer à la limite dans une relation de récurrence sans justifier la continuité de la fonction utilisée.",
    "Choisir un rang $N$ indépendant de $\\varepsilon$ dans une preuve par définition.",
    "Oublier que la convergence d'une suite n'impose aucune monotonie."
  ];

  const extraExercises = [
    {
      id: "limits-v1-unique",
      topic: "limits",
      category: "Analyse",
      difficulty: "Intermédiaire",
      title: "Unicité de la limite — Démonstration",
      question: "Démontrer qu'une suite réelle ne peut pas avoir deux limites distinctes.",
      hints: [
        "Suppose que la suite converge vers deux réels $\\ell$ et $m$.",
        "Écris une inégalité qui majore $|\\ell-m|$ à l'aide de $u_n$."
      ],
      answer: "Supposons que $u_n\\to\\ell$ et $u_n\\to m$. Pour tout $n$, l'inégalité triangulaire donne $|\\ell-m|=|\\ell-u_n+u_n-m|\\leq|\\ell-u_n|+|u_n-m|$. En faisant tendre $n$ vers l'infini, le membre de droite tend vers $0$. On obtient $|\\ell-m|=0$, donc $\\ell=m$. La limite est unique.",
      solutionSteps: [
        "**Supposer deux limites.** Supposons que $(u_n)$ converge vers $\\ell$ et vers $m$.",
        "**Utiliser l'inégalité triangulaire.** Pour tout $n$, $|\\ell-m|=|\\ell-u_n+u_n-m|\\leq|\\ell-u_n|+|u_n-m|$.",
        "**Faire tendre le rang vers l'infini.** Puisque $u_n\\to\\ell$ et $u_n\\to m$, les deux termes du membre de droite tendent vers $0$. Le nombre fixe $|\\ell-m|$ est donc inférieur ou égal à $0$.",
        "**Conclusion.** $|\\ell-m|=0$, donc $\\boxed{\\ell=m}$. La limite d'une suite, lorsqu'elle existe, est unique."
      ],
      check: "La contradiction ne vient pas d'une supposition que les limites sont différentes : l'inégalité montre directement qu'elles sont égales."
    },
    {
      id: "limits-v1-squeeze",
      topic: "limits",
      category: "Analyse",
      difficulty: "Intermédiaire",
      title: "Théorème des gendarmes — Application",
      question: "On définit $u_n=\\frac{\\sin n}{n}$ pour $n\\geq1$. Démontrer que $u_n\\to0$.",
      hints: [
        "Rappelle l'encadrement valable pour tout réel $x$ : $-1\\leq\\sin x\\leq1$.",
        "Divise cet encadrement par $n>0$, puis utilise le théorème des gendarmes."
      ],
      answer: "Pour tout $n\\geq1$, $-1\\leq\\sin n\\leq1$. Comme $n>0$, on obtient $-\\frac1n\\leq\\frac{\\sin n}{n}\\leq\\frac1n$. Or $-1/n\\to0$ et $1/n\\to0$. Par le théorème des gendarmes, $\\boxed{u_n\\to0}$.",
      solutionSteps: [
        "**Encadrer le numérateur.** Pour tout réel $x$, $-1\\leq\\sin x\\leq1$. En particulier, cette inégalité est vraie pour $x=n$.",
        "**Diviser par un nombre positif.** Comme $n\\geq1$, la division par $n$ conserve l'ordre : $-\\frac1n\\leq\\frac{\\sin n}{n}\\leq\\frac1n$.",
        "**Identifier les deux limites.** On sait que $1/n\\to0$, donc $-1/n\\to0$ également.",
        "**Appliquer le théorème des gendarmes.** La suite centrale est encadrée par deux suites de même limite $0$. Ainsi $\\boxed{\\frac{\\sin n}{n}\\longrightarrow0}$."
      ],
      check: "Il faut vérifier que le diviseur n est positif pour conserver le sens des inégalités."
    },
    {
      id: "limits-v1-geometric",
      topic: "limits",
      category: "Analyse",
      difficulty: "Facile",
      title: "Suite géométrique — Limite",
      question: "Déterminer la limite de $u_n=\\left(\\frac34\\right)^n$ lorsque $n\\to+\\infty$, en justifiant le résultat.",
      hints: [
        "Reconnais une suite géométrique de raison $q=3/4$.",
        "Compare la valeur absolue de la raison à 1."
      ],
      answer: "La suite est géométrique de raison $q=3/4$. Comme $|q|=3/4<1$, le théorème sur les suites géométriques donne $q^n\\to0$. Donc $\\boxed{u_n\\to0}$.",
      solutionSteps: [
        "**Identifier la nature de la suite.** On a $u_n=q^n$ avec $q=\\frac34$. C'est une suite géométrique.",
        "**Vérifier la condition sur la raison.** On a $|q|=\\frac34<1$.",
        "**Appliquer le théorème.** Pour toute raison $q$ telle que $|q|<1$, la suite géométrique $(q^n)$ converge vers $0$.",
        "**Conclusion.** $\\boxed{\\lim_{n\\to+\\infty}\\left(\\frac34\\right)^n=0}$."
      ],
      check: "Le résultat dépend de la condition stricte $|q|<1$ ; si $q=1$ ou $q=-1$, la conclusion serait différente."
    }
  ];

  const existingIds = new Set(window.EXERCISES.map(e => e.id));
  for (const exercise of extraExercises) {
    if (!existingIds.has(exercise.id)) window.EXERCISES.push(exercise);
  }

  const cards = [
    {topic:"limits",front:"Une suite convergente est-elle nécessairement bornée ?",back:"Oui. Si $u_n\\to\\ell$, alors à partir d'un certain rang $|u_n-\\ell|<1$, donc $|u_n|<|\\ell|+1$. Les premiers termes sont en nombre fini : toute la suite est bornée."},
    {topic:"limits",front:"Théorème de convergence monotone (croissante)",back:"Toute suite croissante et majorée converge. Sa limite est la borne supérieure de ses termes."},
    {topic:"limits",front:"Théorème des gendarmes",back:"Si $u_n\\leq v_n\\leq w_n$ à partir d'un certain rang et si $u_n$ et $w_n$ tendent vers $\\ell$, alors $v_n\\to\\ell$."},
    {topic:"limits",front:"Une suite peut-elle être bornée sans converger ?",back:"Oui. Exemple : $u_n=(-1)^n$ est bornée entre $-1$ et $1$, mais elle n'a pas de limite."},
    {topic:"limits",front:"Unicité de la limite",back:"Une suite réelle ne peut avoir qu'une seule limite. Si $u_n\\to\\ell$ et $u_n\\to m$, alors $|\\ell-m|\\leq|\\ell-u_n|+|u_n-m|\\to0$, donc $\\ell=m$."}
  ];
  const knownCards = new Set(window.FLASHCARDS.map(c => c.front));
  for (const card of cards) if (!knownCards.has(card.front)) window.FLASHCARDS.push(card);
})();

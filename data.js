window.TOPICS = [
{id:"limits",title:"Limites et convergence",category:"Analyse",level:"L1",chapter:"Analyse",summary:"Étudier le comportement d'une fonction ou d'une suite au voisinage d'un point ou à l'infini.",definitions:[["Limite finie","On dit que $f(x)$ tend vers $\\ell$ lorsque $x$ tend vers $a$ si, pour tout $\\varepsilon>0$, il existe $\\eta>0$ tel que $0<|x-a|<\\eta$ entraîne $|f(x)-\\ell|<\\varepsilon$."],["Convergence d'une suite","La suite $(u_n)$ converge vers $\\ell$ si, pour tout $\\varepsilon>0$, il existe $N\\in\\mathbb N$ tel que $n\\geq N$ implique $|u_n-\\ell|<\\varepsilon$."]],properties:["La limite d'une somme est la somme des limites lorsque les limites existent.","Si $u_n\\to 0$ et $(v_n)$ est bornée, alors $u_nv_n\\to0."],example:"Pour $u_n=1/n$, soit $\\varepsilon>0$. Choisissons $N>1/\\varepsilon$. Alors $n\\geq N$ implique $0<1/n<\\varepsilon$, donc $u_n\\to0$.",exerciseId:"e1",prerequisites:[]},
{id:"continuity",title:"Continuité",category:"Analyse",level:"L1",chapter:"Analyse",summary:"Relier les limites locales à la valeur d'une fonction.",definitions:[["Continuité en $a$","Une fonction $f$ est continue en $a$ si $\\lim_{x\\to a}f(x)=f(a)$."]],properties:["Toute fonction dérivable en un point y est continue en ce point.","L'image d'un intervalle par une fonction continue est un intervalle."],example:"La fonction polynomiale $x\\mapsto x^2$ est continue sur $\\mathbb R$.",exerciseId:"e2",prerequisites:["limits"]},
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
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
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
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
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
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
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
    "topic": "integrals",
    "category": "Analyse",
    "difficulty": "Intermédiaire",
    "title": "Intégration — Intermédiaire · Exercice 36",
    "question": "Décrire les lignes de niveau de la fonction \\(f(x,y)=x^2+y^2\\) correspondant à la valeur \\(1\\).",
    "hints": [
      "Résoudre x²+y²=1."
    ],
    "answer": "La ligne de niveau est le cercle unité de centre (0,0) et de rayon 1.",
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
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
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
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
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
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
    "solutionSteps": [],
    "check": "Relis chaque implication, vérifie les hypothèses utilisées et assure-toi que la conclusion répond exactement à la question."
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
  }
];

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
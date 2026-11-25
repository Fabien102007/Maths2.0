/* Mathevo — programme complémentaire et corrections enrichies */
(() => {
"use strict";
const byId = Object.fromEntries(window.EXERCISES.map(e => [e.id,e]));
const move = (id, topic, title) => { if(byId[id]) Object.assign(byId[id], {topic,title}); };
move("m4-31","trigonometry","Trigonométrie — Périodicité du cosinus");
move("m4-32","taylor","Développements limités — Exponentielle à l'ordre 2");
move("m4-33","taylor","Développements limités — Équivalent logarithmique");
move("m4-35","compactness","Compacité — Segment fermé et borné");
move("m4-36","multivariable","Fonctions de plusieurs variables — Ligne de niveau");
const topics = [
{id:"trigonometry",title:"Trigonométrie",category:"Analyse",level:"Lycée",chapter:"Fonctions et trigonométrie",summary:"Cercle trigonométrique, identités, équations et périodicité.",definitions:[["Cercle trigonométrique","Le cercle unité est le cercle de centre O et de rayon 1. Le point associé à θ a pour coordonnées (cos θ,sin θ)."],["Périodicité","Sinus et cosinus sont 2π-périodiques."]],properties:["cos²x+sin²x=1.","cos est paire et sin est impaire.","La période fondamentale de cos(ax), a≠0, est 2π/|a|."],example:"cos x=1/2 sur [0,2π] équivaut à x=π/3 ou 5π/3.",exerciseId:"m4-62",prerequisites:[]},
{id:"taylor",title:"Développements limités",category:"Analyse",level:"Prépa",chapter:"Analyse asymptotique",summary:"Approcher une fonction par un polynôme et en déduire limites et équivalents.",definitions:[["DL en 0","Un DL à l'ordre n s'écrit f(x)=a₀+…+aₙxⁿ+o(xⁿ)."],["Équivalence","f(x)∼g(x) signifie f(x)/g(x)→1."]],properties:["eˣ=1+x+x²/2+o(x²).","ln(1+x)=x−x²/2+o(x²).","Le premier terme non nul donne souvent un équivalent."],example:"ln(1+x)−x∼−x²/2 lorsque x→0.",exerciseId:"m4-65",prerequisites:["limits","derivative"]},
{id:"compactness",title:"Compacité et continuité",category:"Analyse",level:"L1",chapter:"Topologie de R",summary:"Utiliser la compacité des segments et les propriétés des fonctions continues sur un compact.",definitions:[["Compacité dans R","Une partie de R est compacte si et seulement si elle est fermée et bornée."],["Bornes atteintes","Une fonction continue sur un compact non vide atteint son minimum et son maximum."]],properties:["Tout segment [a,b] est compact.","L'image continue d'un compact est compacte.","Une fonction continue sur un compact est bornée."],example:"[0,1] est compact ; ]0,1[ ne l'est pas car il n'est pas fermé.",exerciseId:"m4-68",prerequisites:["continuity"]},
{id:"multivariable",title:"Fonctions de plusieurs variables",category:"Analyse",level:"L2",chapter:"Analyse à plusieurs variables",summary:"Étudier les lignes de niveau, dérivées partielles et points critiques de f(x,y).",definitions:[["Dérivée partielle","$\\frac{\\partial f}{\\partial x}$ mesure la variation de $f$ lorsque $x$ varie et que les autres variables restent fixes."],["Point critique","Un point intérieur où les dérivées partielles premières s'annulent est un point critique."]],properties:["Les lignes de niveau sont les ensembles f(x,y)=c.","$\\nabla f(x,y)=\\left(\\frac{\\partial f}{\\partial x},\\frac{\\partial f}{\\partial y}\\right)$ donne la direction de plus forte augmentation locale lorsque $f$ est différentiable.","Un point critique peut être un point selle."],example:"Pour f(x,y)=x²+y², la ligne de niveau f=1 est le cercle unité.",exerciseId:"m4-36",prerequisites:["derivative"]},
{id:"complex",title:"Nombres complexes",category:"Analyse",level:"Lycée",chapter:"Nombres et calculs",summary:"Calculer avec les complexes et interpréter module, conjugué et représentation géométrique.",definitions:[["Forme algébrique","z=a+ib avec a,b réels et i²=−1."],["Module","|a+ib|=√(a²+b²)."],["Conjugué","Le conjugué de a+ib est a−ib."]],properties:["z z̄=|z|².","|zw|=|z||w|.","e^{iθ}=cos θ+i sin θ."],example:"Pour z=3−4i, z̄=3+4i et |z|=5.",exerciseId:"m4-71",prerequisites:[]},
{id:"polynomials",title:"Polynômes",category:"Algèbre",level:"L1",chapter:"Algèbre",summary:"Factoriser, déterminer les racines et exploiter le degré d'un polynôme.",definitions:[["Racine","a est racine de P si P(a)=0 ; alors X−a divise P."],["Multiplicité","La multiplicité de a est le plus grand m tel que (X−a)^m divise P."]],properties:["Un polynôme non nul de degré n possède au plus n racines distinctes.","Si a est racine, P=(X−a)Q.","Le reste de la division par X−a est P(a)."],example:"X²−5X+6=(X−2)(X−3).",exerciseId:"m4-74",prerequisites:[]},
{id:"linear-systems",title:"Systèmes linéaires",category:"Algèbre",level:"L1",chapter:"Algèbre linéaire",summary:"Résoudre des systèmes par substitution et élimination de Gauss.",definitions:[["Système linéaire","Un système linéaire s'écrit AX=b."],["Système homogène","AX=0 possède toujours la solution nulle ; ses solutions forment un sous-espace."]],properties:["Les opérations élémentaires sur les lignes préservent les solutions.","Un système peut avoir aucune, une ou une infinité de solutions.","Si A est carrée et det(A)≠0, AX=b possède une unique solution."],example:"2x+y=5 et x−y=1 donnent x=2 et y=1.",exerciseId:"m4-77",prerequisites:["matrices"]},
{id:"probability",title:"Probabilités",category:"Analyse",level:"Lycée",chapter:"Probabilités",summary:"Calculer des probabilités, utiliser le conditionnement et comprendre les variables aléatoires.",definitions:[["Probabilité conditionnelle","Si P(B)>0, P(A|B)=P(A∩B)/P(B)."],["Espérance","Pour une variable discrète finie, E(X)=Σ xᵢP(X=xᵢ)."]],properties:["P(A∪B)=P(A)+P(B)−P(A∩B).","Si A et B sont indépendants, P(A∩B)=P(A)P(B).","Pour une Bernoulli(p), E(X)=p et V(X)=p(1−p)."],example:"Pour un dé équilibré, P(nombre pair)=3/6=1/2.",exerciseId:"m4-80",prerequisites:[]},
{id:"differential-equations",title:"Équations différentielles",category:"Analyse",level:"L1",chapter:"Analyse",summary:"Résoudre les équations différentielles élémentaires et appliquer une condition initiale.",definitions:[["Équation différentielle","Une équation différentielle relie une fonction inconnue à ses dérivées."],["Condition initiale","Une condition telle que y(x₀)=y₀ sélectionne une solution particulière."]],properties:["Les solutions de y'=ay sont y=Ce^{ax}.","Les solutions de y'+ay=0 sont y=Ce^{-ax}.","Les solutions de y'=g sont les primitives de g."],example:"y'=3y et y(0)=2 donnent y=2e^{3x}.",exerciseId:"m4-83",prerequisites:["derivative"]},
{id:"euclidean",title:"Espaces euclidiens et orthogonalité",category:"Algèbre",level:"L1",chapter:"Algèbre",summary:"Utiliser produit scalaire, orthogonalité, projections et bases orthonormées.",definitions:[["Produit scalaire","Un produit scalaire réel est bilinéaire, symétrique et défini positif."],["Orthogonalité","x et y sont orthogonaux lorsque ⟨x,y⟩=0."],["Norme associée","||x||=√⟨x,x⟩."]],properties:["Si x⊥y, ||x+y||²=||x||²+||y||².","Cauchy–Schwarz : |⟨x,y⟩|≤||x||||y||.","projᵤ(x)=⟨x,u⟩u/||u||² pour u≠0."],example:"(1,1) et (1,−1) sont orthogonaux car leur produit scalaire vaut 0.",exerciseId:"m4-86",prerequisites:["vector-spaces"]},
{id:"series",title:"Séries numériques",category:"Analyse",level:"Prépa",chapter:"Analyse",summary:"Étudier la convergence des sommes infinies et maîtriser les séries de référence.",definitions:[["Série numérique","La série Σuₙ converge lorsque la suite de ses sommes partielles converge."],["Condition nécessaire","Si Σuₙ converge, alors uₙ tend vers 0."]],properties:["Une série géométrique de raison q converge si |q|<1.","La série de Riemann Σ1/nᵖ converge si et seulement si p>1.","La série harmonique Σ1/n diverge."],example:"Σ(1/3)ⁿ=1/(1−1/3)=3/2.",exerciseId:"m4-89",prerequisites:["limits"]}
];
const courseEnrichments = {
  "trigonometry": {
    "lessonSections": [
      {
        "title": "Mesurer un angle : radians et cercle trigonométrique",
        "body": "Le cercle trigonométrique est le cercle de centre O et de rayon 1, orienté dans le sens direct. Un angle en radians mesure la longueur algébrique de l'arc parcouru sur ce cercle. Un tour complet vaut $2\\pi$, un demi-tour vaut $\\pi$ et un quart de tour vaut $\\pi/2$. Les radians sont l'unité naturelle pour l'analyse."
      },
      {
        "title": "Coordonnées et identités fondamentales",
        "body": "Au réel $x$, on associe le point $M(x)=(\\cos x,\\sin x)$ du cercle unité. Son appartenance au cercle donne immédiatement $\\cos^2x+\\sin^2x=1$. Le cosinus est l'abscisse et le sinus l'ordonnée : cette lecture permet de retrouver les signes selon le quadrant et les valeurs remarquables."
      },
      {
        "title": "Périodicité et symétries",
        "body": "Les fonctions sinus et cosinus sont $2\\pi$-périodiques. On a $\\cos(-x)=\\cos x$ et $\\sin(-x)=-\\sin x$. Les formules $\\cos(\\pi-x)=-\\cos x$ et $\\sin(\\pi-x)=\\sin x$ permettent de ramener un angle à un angle de référence. Pour $a\\ne0$, la période fondamentale de $x\\mapsto\\cos(ax)$ ou $x\\mapsto\\sin(ax)$ est $2\\pi/|a|$."
      },
      {
        "title": "Résoudre une équation trigonométrique",
        "body": "Résoudre $\\cos x=c$ revient à chercher les points du cercle unité d'abscisse $c$. Si $c\\in[-1,1]$, les solutions s'écrivent $x=\\pm\\arccos(c)+2k\\pi$, avec $k\\in\\mathbb Z$. Pour $\\sin x=c$, on utilise les deux angles ayant l'ordonnée $c$. Il faut toujours intersecter l'ensemble des solutions avec l'intervalle demandé."
      }
    ],
    "theorems": [
      {
        "title": "Identité fondamentale",
        "statement": "Pour tout réel $x$, $\\cos^2x+\\sin^2x=1$. ",
        "proof": "Le point $M(x)$ du cercle trigonométrique a pour coordonnées $(\\cos x,\\sin x)$. Le cercle unité est défini par $X^2+Y^2=1$. En remplaçant $X$ et $Y$ par les coordonnées de $M(x)$, on obtient l'identité."
      }
    ],
    "methods": [
      "Pour résoudre une équation sur un intervalle, trouver d'abord les solutions générales, puis sélectionner celles qui appartiennent à l'intervalle.",
      "Pour simplifier une expression, utiliser l'identité fondamentale et les parités avant de développer."
    ],
    "commonErrors": [
      "Confondre degrés et radians dans les formules d'analyse.",
      "Oublier les solutions périodiques lorsqu'on résout une équation sur ℝ.",
      "Confondre le sinus (ordonnée) et le cosinus (abscisse) sur le cercle."
    ]
  },
  "taylor": {
    "lessonSections": [
      {
        "title": "Pourquoi développer une fonction ?",
        "body": "Un développement limité remplace localement une fonction par un polynôme plus simple. Près d'un point, ce polynôme permet de calculer des limites, comparer des fonctions ou étudier le signe d'une différence. Le terme de reste précise la qualité de l'approximation."
      },
      {
        "title": "Formule de Taylor-Young",
        "body": "Au voisinage de 0, si $f$ est suffisamment dérivable, son développement limité à l'ordre $n$ est $f(x)=\\sum_{k=0}^{n}\\frac{f^{(k)}(0)}{k!}x^k+o(x^n)$. Le symbole $o(x^n)$ signifie que le reste divisé par $x^n$ tend vers 0."
      },
      {
        "title": "Développements usuels et opérations",
        "body": "Les développements de référence sont $e^x=1+x+x^2/2+o(x^2)$, $\\sin x=x-x^3/6+o(x^3)$, $\\cos x=1-x^2/2+o(x^2)$ et $\\ln(1+x)=x-x^2/2+o(x^2)$. On peut additionner et multiplier des développements en contrôlant l'ordre du reste. Pour un quotient, il faut que le dénominateur ait un terme constant non nul, ou factoriser le premier terme non nul."
      },
      {
        "title": "Équivalents et limites",
        "body": "Si $f(x)=a x^p+o(x^p)$ avec $a\\ne0$, alors $f(x)\\sim a x^p$. Un équivalent permet de remplacer une fonction par une autre dans un produit ou un quotient, mais pas en général dans une somme : les termes dominants peuvent s'annuler. Dans ce cas, il faut pousser le développement à un ordre supérieur."
      }
    ],
    "theorems": [
      {
        "title": "Formule de Taylor-Young en 0",
        "statement": "Si $f$ est $n$ fois dérivable au voisinage de 0, alors $f(x)=\\sum_{k=0}^{n}\\frac{f^{(k)}(0)}{k!}x^k+o(x^n)$ lorsque $x\\to0$. ",
        "proof": "La formule de Taylor avec reste de Peano exprime que l'écart entre $f$ et son polynôme de Taylor d'ordre $n$, divisé par $x^n$, tend vers 0. Les coefficients du polynôme sont imposés par les dérivées successives en 0 : le terme de degré $k$ est $f^{(k)}(0)x^k/k!$. Le reste est donc bien $o(x^n)$."
      }
    ],
    "methods": [
      "Pour obtenir un équivalent, repérer le premier terme non nul du développement après simplification.",
      "Pour une différence de deux fonctions proches, développer jusqu'au premier ordre où les termes ne s'annulent plus.",
      "Vérifier systématiquement l'ordre du reste après multiplication ou composition."
    ],
    "commonErrors": [
      "Écrire un DL sans préciser le point et l'ordre.",
      "Conserver un reste $o(x^n)$ après une opération qui exige un ordre supérieur.",
      "Remplacer un terme dans une somme par un équivalent sans vérifier qu'il n'y a pas compensation."
    ]
  },
  "compactness": {
    "lessonSections": [
      {
        "title": "Compacité dans ℝ",
        "body": "Dans la droite réelle, le théorème de Heine-Borel donne un critère particulièrement simple : une partie est compacte si et seulement si elle est fermée et bornée. Un segment $[a,b]$ est donc compact, contrairement à un intervalle ouvert ou à une demi-droite."
      },
      {
        "title": "Compacité et suites",
        "body": "Une caractérisation fondamentale est la compacité séquentielle : de toute suite d'éléments d'un compact, on peut extraire une sous-suite convergente dont la limite appartient encore au compact. Cette propriété empêche les suites de « s'échapper » du domaine."
      },
      {
        "title": "Fonctions continues sur un compact",
        "body": "L'image continue d'un compact est compacte. En particulier, si $K$ est compact et $f:K\\to\\mathbb R$ continue, alors $f(K)$ est fermé et borné. Si $K$ est non vide, $f$ atteint effectivement son minimum et son maximum."
      },
      {
        "title": "Utiliser la compacité dans une preuve",
        "body": "Pour prouver qu'une fonction est bornée ou atteint ses bornes, vérifier d'abord que le domaine est compact et que la fonction est continue. Pour montrer qu'un ensemble n'est pas compact dans ℝ, exhiber une absence de fermeture ou de bornitude ; une suite convergeant vers un point extérieur constitue souvent une preuve efficace."
      }
    ],
    "theorems": [
      {
        "title": "Théorème des bornes atteintes",
        "statement": "Toute fonction continue sur un compact non vide $K$ à valeurs dans $\\mathbb R$ est bornée et atteint son minimum et son maximum.",
        "proof": "L'image $f(K)$ d'un compact par une application continue est compacte. Or toute partie compacte de $\\mathbb R$ est fermée et bornée. Elle est donc non vide, possède une borne inférieure et une borne supérieure, et comme elle est fermée ces deux bornes appartiennent à $f(K)$. Il existe ainsi des points de $K$ où le minimum et le maximum sont atteints."
      }
    ],
    "methods": [
      "Pour appliquer Heine-Borel dans ℝ, vérifier séparément la fermeture et la bornitude.",
      "Pour prouver qu'un ensemble n'est pas fermé, construire une suite de cet ensemble qui converge vers un point extérieur."
    ],
    "commonErrors": [
      "Confondre bornitude et compacité : un intervalle ouvert borné n'est pas compact.",
      "Oublier l'hypothèse de continuité dans le théorème des bornes atteintes.",
      "Oublier que le compact doit être non vide pour parler de minimum et de maximum atteints."
    ]
  },
  "multivariable": {
    "lessonSections": [
      {
        "title": "Fonctions de plusieurs variables",
        "body": "Une fonction $f:D\\subset\\mathbb R^2\\to\\mathbb R$ associe un nombre à chaque point $(x,y)$ de son domaine. Son graphe est une surface dans l'espace. Les courbes de niveau $f(x,y)=c$ donnent une représentation plane de cette surface et permettent de visualiser ses variations."
      },
      {
        "title": "Dérivées partielles",
        "body": "La dérivée partielle par rapport à $x$ mesure la variation de $f$ lorsque $x$ varie et que $y$ est maintenu fixe. On la calcule en dérivant par rapport à $x$ comme si $y$ était une constante. On procède de même pour la dérivée partielle par rapport à $y$."
      },
      {
        "title": "Gradient et approximation locale",
        "body": "Lorsque les dérivées partielles existent, le gradient est $\\nabla f=(\\partial_x f,\\partial_y f)$. Si $f$ est différentiable, le gradient indique la direction de plus forte augmentation locale. La différentielle donne l'approximation affine $f(a+h,b+k)\\approx f(a,b)+\\partial_xf(a,b)h+\\partial_yf(a,b)k$."
      },
      {
        "title": "Points critiques et extrema",
        "body": "Un point intérieur où les dérivées partielles premières s'annulent est un point critique. Un point critique n'est pas nécessairement un extremum : il peut être un point selle. Pour classifier un point critique, on étudie souvent la matrice hessienne, composée des dérivées secondes, lorsque celles-ci existent."
      }
    ],
    "theorems": [
      {
        "title": "Condition nécessaire au premier ordre",
        "statement": "Si $f$ est différentiable et admet un extremum local en un point intérieur $a\\in\\mathbb R^2$, alors $\\nabla f(a)=0$.",
        "proof": "Supposons que $a=(a_1,a_2)$ soit un extremum local. Pour chaque direction coordonnée, les fonctions d'une variable $g_1(t)=f(a_1+t,a_2)$ et $g_2(t)=f(a_1,a_2+t)$ admettent un extremum local en $t=0$. Par le théorème de Fermat en dimension 1, $g_1'(0)=g_2'(0)=0$. Ces dérivées sont précisément les dérivées partielles de $f$ en $a$. Le gradient est donc nul."
      }
    ],
    "methods": [
      "Pour calculer une dérivée partielle, garder toutes les autres variables constantes.",
      "Pour chercher les points critiques, résoudre simultanément l'annulation de toutes les dérivées partielles premières.",
      "Ne conclure à un extremum qu'après une étude complémentaire, par exemple avec la hessienne ou les variations."
    ],
    "commonErrors": [
      "Croire que l'annulation du gradient suffit à prouver un extremum.",
      "Oublier de préciser le domaine et de vérifier que le point est intérieur.",
      "Confondre dérivabilité partielle et différentiabilité totale."
    ]
  },
  "complex": {
    "lessonSections": [
      {
        "title": "Forme algébrique",
        "body": "Un nombre complexe s'écrit de manière unique $z=a+ib$, avec $a,b\\in\\mathbb R$ et $i^2=-1$. La partie réelle est $a$, la partie imaginaire est $b$. Les opérations se font en développant puis en remplaçant $i^2$ par $-1$."
      },
      {
        "title": "Conjugué et module",
        "body": "Le conjugué de $z=a+ib$ est $\\overline z=a-ib$. On a $z\\overline z=a^2+b^2=|z|^2$ et $|z|=\\sqrt{a^2+b^2}$. Le module est la distance du point d'affixe $z$ à l'origine."
      },
      {
        "title": "Argument et forme trigonométrique",
        "body": "Pour $z\\ne0$, il existe un angle $\\theta$ tel que $z=|z|(\\cos\\theta+i\\sin\\theta)$. Cet angle est un argument de $z$, défini modulo $2\\pi$. La formule d'Euler donne $e^{i\\theta}=\\cos\\theta+i\\sin\\theta$, d'où la forme exponentielle $z=re^{i\\theta}$."
      },
      {
        "title": "Produits, quotients et puissances",
        "body": "Les modules se multiplient : $|zw|=|z||w|$, et les arguments s'additionnent modulo $2\\pi$. Pour les quotients, les modules se divisent et les arguments se soustraient. La formule de De Moivre donne $(\\cos\\theta+i\\sin\\theta)^n=\\cos(n\\theta)+i\\sin(n\\theta)$ pour tout entier $n$."
      }
    ],
    "theorems": [
      {
        "title": "Formule de De Moivre",
        "statement": "Pour tout entier $n$ et tout réel $\\theta$, $(\\cos\\theta+i\\sin\\theta)^n=\\cos(n\\theta)+i\\sin(n\\theta)$.",
        "proof": "Pour $n\\geq0$, la formule résulte de la formule d'Euler et de la propriété $e^{i\\theta}e^{i\\varphi}=e^{i(\\theta+\\varphi)}$. En effet, $(e^{i\\theta})^n=e^{in\\theta}$. En réécrivant avec la formule d'Euler, on obtient l'identité. Pour les entiers négatifs, on utilise que $e^{i\\theta}\\ne0$ et que son inverse est $e^{-i\\theta}$."
      }
    ],
    "methods": [
      "Pour calculer un module, utiliser $|a+ib|=\\sqrt{a^2+b^2}$.",
      "Pour résoudre une équation de puissances complexes, passer en forme exponentielle et tenir compte de tous les arguments modulo $2\\pi$.",
      "Vérifier les solutions en les remplaçant dans l'équation initiale."
    ],
    "commonErrors": [
      "Confondre partie imaginaire et coefficient de i.",
      "Oublier que l'argument est défini modulo $2\\pi$.",
      "Diviser par un complexe sans vérifier qu'il est non nul."
    ]
  },
  "polynomials": {
    "lessonSections": [
      {
        "title": "Degré et opérations",
        "body": "Un polynôme réel est une somme finie $P(X)=a_0+a_1X+\\cdots+a_nX^n$. Si $a_n\\ne0$, son degré est $n$. Le degré d'un produit de deux polynômes non nuls est la somme de leurs degrés."
      },
      {
        "title": "Racines et factorisation",
        "body": "Un réel $a$ est racine de $P$ lorsque $P(a)=0$. Le théorème du facteur affirme que cela équivaut à la divisibilité de $P$ par $X-a$. On peut donc factoriser successivement un polynôme en connaissant ses racines."
      },
      {
        "title": "Division euclidienne et reste",
        "body": "Pour tout polynôme $P$ et tout polynôme non nul $Q$, il existe un unique couple $(S,R)$ tel que $P=QS+R$ et $\\deg R<\\deg Q$. Lorsque $Q=X-a$, le reste est une constante égale à $P(a)$."
      },
      {
        "title": "Multiplicité des racines",
        "body": "La racine $a$ est de multiplicité $m$ si $(X-a)^m$ divise $P$ mais $(X-a)^{m+1}$ ne divise pas $P$. Un polynôme non nul de degré $n$ possède au plus $n$ racines distinctes, et la somme des multiplicités de ses racines réelles ne dépasse pas son degré."
      }
    ],
    "theorems": [
      {
        "title": "Théorème du facteur",
        "statement": "Pour tout polynôme $P\\in\\mathbb R[X]$ et tout réel $a$, $P(a)=0$ si et seulement s'il existe $Q\\in\\mathbb R[X]$ tel que $P(X)=(X-a)Q(X)$.",
        "proof": "La division euclidienne de $P$ par $X-a$ donne $P(X)=(X-a)Q(X)+r$, où $r$ est constant. En évaluant en $a$, on obtient $P(a)=r$. Ainsi $P(a)=0$ équivaut à $r=0$, ce qui équivaut à la factorisation annoncée."
      }
    ],
    "methods": [
      "Pour factoriser un polynôme, tester des racines simples puis utiliser le théorème du facteur.",
      "Pour trouver le reste de la division par $X-a$, calculer directement $P(a)$.",
      "Après factorisation, vérifier le résultat par développement."
    ],
    "commonErrors": [
      "Confondre racine et facteur sans justifier le théorème du facteur.",
      "Oublier le coefficient dominant lors d'une factorisation.",
      "Compter une racine multiple comme plusieurs racines distinctes."
    ]
  },
  "linear-systems": {
    "lessonSections": [
      {
        "title": "Écriture matricielle",
        "body": "Un système linéaire de $m$ équations à $n$ inconnues s'écrit $AX=b$, où $A$ est la matrice des coefficients, $X$ le vecteur des inconnues et $b$ le second membre. Le système homogène correspond au cas $b=0$."
      },
      {
        "title": "Opérations élémentaires et méthode de Gauss",
        "body": "On peut échanger deux lignes, multiplier une ligne par un scalaire non nul ou ajouter à une ligne un multiple d'une autre. Ces opérations ne changent pas l'ensemble des solutions. La méthode du pivot de Gauss utilise ces opérations pour obtenir une forme échelonnée et lire les inconnues."
      },
      {
        "title": "Nombre de solutions",
        "body": "Un système peut être incompatible, avoir une solution unique ou une infinité de solutions. Une ligne de la forme $0= c$ avec $c\\ne0$ révèle une incompatibilité. Dans un système homogène, le vecteur nul est toujours solution."
      },
      {
        "title": "Cas d'une matrice carrée inversible",
        "body": "Si $A$ est carrée et $\\det(A)\\ne0$, elle est inversible et le système $AX=b$ possède une unique solution $X=A^{-1}b$. Si le déterminant est nul, on ne peut pas conclure directement : il faut étudier le rang ou effectuer l'élimination de Gauss."
      }
    ],
    "theorems": [
      {
        "title": "Critère d'inversibilité",
        "statement": "Pour une matrice carrée $A$, les propriétés suivantes sont équivalentes : $A$ est inversible, $\\det(A)\\ne0$, et pour tout second membre $b$, le système $AX=b$ admet une unique solution.",
        "proof": "Si $A$ est inversible, l'équation $AX=b$ équivaut à $X=A^{-1}b$, ce qui donne une solution unique. Une matrice carrée est inversible si et seulement si son déterminant est non nul. Réciproquement, si le déterminant est nul, le noyau de l'application $X\\mapsto AX$ contient un vecteur non nul ; le système homogène possède alors au moins deux solutions, donc l'unicité échoue pour $b=0$."
      }
    ],
    "methods": [
      "Écrire la matrice augmentée $(A|b)$ avant de commencer l'élimination.",
      "Annoncer chaque opération élémentaire et conserver les fractions exactes autant que possible.",
      "Vérifier la solution finale en la substituant dans le système initial."
    ],
    "commonErrors": [
      "Multiplier une ligne par zéro, opération qui n'est pas réversible.",
      "Oublier d'appliquer une opération à toute la ligne, y compris au second membre.",
      "Conclure qu'un déterminant nul signifie toujours aucune solution : il peut aussi y en avoir une infinité."
    ]
  },
  "probability": {
    "lessonSections": [
      {
        "title": "Univers et événements",
        "body": "Une expérience aléatoire est décrite par un univers $\\Omega$. Un événement est une partie de cet univers. Une probabilité $P$ associe à chaque événement un nombre entre 0 et 1, avec $P(\\Omega)=1$ et l'additivité pour les événements incompatibles."
      },
      {
        "title": "Conditionnement et indépendance",
        "body": "Si $P(B)>0$, la probabilité de $A$ sachant $B$ est $P(A|B)=P(A\\cap B)/P(B)$. Les événements $A$ et $B$ sont indépendants lorsque $P(A\\cap B)=P(A)P(B)$. L'indépendance est une propriété différente de l'incompatibilité."
      },
      {
        "title": "Formule des probabilités totales et Bayes",
        "body": "Si $(B_i)$ forme une partition de l'univers avec $P(B_i)>0$, alors $P(A)=\\sum_i P(A|B_i)P(B_i)$. La formule de Bayes permet d'inverser le conditionnement : $P(B_j|A)=P(A|B_j)P(B_j)/P(A)$ lorsque $P(A)>0$."
      },
      {
        "title": "Variables aléatoires",
        "body": "Une variable aléatoire discrète associe une valeur numérique à chaque issue. Pour une variable finie, $E(X)=\\sum_x xP(X=x)$ et $V(X)=E(X^2)-E(X)^2$. Pour une Bernoulli de paramètre $p$, l'espérance vaut $p$ et la variance $p(1-p)$."
      }
    ],
    "theorems": [
      {
        "title": "Formule des probabilités totales",
        "statement": "Si $(B_1,\\ldots,B_n)$ est une partition de $\\Omega$ par des événements de probabilités non nulles, alors $P(A)=\\sum_{i=1}^nP(A|B_i)P(B_i)$.",
        "proof": "Les événements $A\\cap B_i$ sont deux à deux disjoints et leur réunion est $A$, puisque les $B_i$ forment une partition de l'univers. Par additivité, $P(A)=\\sum_iP(A\\cap B_i)$. Par définition du conditionnement, $P(A\\cap B_i)=P(A|B_i)P(B_i)$. En remplaçant chaque terme, on obtient la formule."
      }
    ],
    "methods": [
      "Pour une probabilité conditionnelle, identifier clairement l'événement qui constitue la condition et vérifier que sa probabilité est non nulle.",
      "Pour utiliser les probabilités totales, vérifier que les événements considérés forment bien une partition.",
      "Distinguer indépendance et incompatibilité avant d'utiliser une formule."
    ],
    "commonErrors": [
      "Inverser $P(A|B)$ et $P(B|A)$.",
      "Utiliser une formule de conditionnement lorsque la probabilité de l'événement conditionnant est nulle.",
      "Confondre événements incompatibles et événements indépendants."
    ]
  },
  "differential-equations": {
    "lessonSections": [
      {
        "title": "Qu'est-ce qu'une équation différentielle ?",
        "body": "Une équation différentielle relie une fonction inconnue à une ou plusieurs de ses dérivées. Résoudre l'équation consiste à déterminer toutes les fonctions qui la vérifient sur un intervalle donné. Les constantes d'intégration apparaissent naturellement."
      },
      {
        "title": "Équation homogène y'=ay",
        "body": "Pour une constante réelle $a$, l'équation $y'=ay$ possède pour solutions $y(x)=Ce^{ax}$. On peut vérifier cette expression par dérivation. La constante $C$ est déterminée par une condition initiale lorsqu'elle est donnée."
      },
      {
        "title": "Équation y'=g(x)",
        "body": "L'équation $y'=g(x)$ se résout en cherchant une primitive de $g$. Si $G'=g$, toutes les solutions sur un intervalle sont $y=G+C$. Deux primitives sur un même intervalle connexe diffèrent d'une constante."
      },
      {
        "title": "Condition initiale et unicité",
        "body": "Une condition telle que $y(x_0)=y_0$ sélectionne une solution particulière parmi la famille générale. Pour $y'=ay$, elle impose $C=y_0e^{-ax_0}$. Il faut toujours remplacer la constante dans la solution générale et vérifier l'équation ainsi que la condition initiale."
      }
    ],
    "theorems": [
      {
        "title": "Solutions de y'=ay",
        "statement": "Les solutions réelles de $y'=ay$ sur un intervalle sont exactement les fonctions $y(x)=Ce^{ax}$, où $C$ est une constante réelle.",
        "proof": "Si $y(x)=Ce^{ax}$, alors $y'(x)=aCe^{ax}=ay(x)$ : toute fonction de cette forme est solution. Réciproquement, si $y'=ay$, considérons $g(x)=e^{-ax}y(x)$. Alors $g'(x)=e^{-ax}(y'(x)-ay(x))=0$. Une fonction dérivable de dérivée nulle sur un intervalle est constante ; donc $g=C$, soit $y=Ce^{ax}$."
      }
    ],
    "methods": [
      "Pour une équation $y'=g(x)$, intégrer puis ajouter une constante arbitraire.",
      "Pour $y'=ay$, reconnaître immédiatement la famille exponentielle et vérifier par dérivation.",
      "Utiliser la condition initiale seulement après avoir écrit la solution générale."
    ],
    "commonErrors": [
      "Oublier la constante d'intégration.",
      "Donner une solution particulière alors que l'on demande toutes les solutions.",
      "Ne pas vérifier la condition initiale après avoir déterminé la constante."
    ]
  },
  "euclidean": {
    "lessonSections": [
      {
        "title": "Produit scalaire et norme",
        "body": "Un produit scalaire réel est une forme bilinéaire, symétrique et définie positive. Il permet de définir la norme associée par $\\|x\\|=\\sqrt{\\langle x,x\\rangle}$. Dans $\\mathbb R^n$ muni du produit scalaire usuel, on multiplie les coordonnées correspondantes puis on additionne."
      },
      {
        "title": "Orthogonalité et Pythagore",
        "body": "Deux vecteurs sont orthogonaux lorsque leur produit scalaire est nul. Pour deux vecteurs orthogonaux, l'identité de Pythagore donne $\\|x+y\\|^2=\\|x\\|^2+\\|y\\|^2$. Une famille orthogonale de vecteurs non nuls est automatiquement libre."
      },
      {
        "title": "Inégalité de Cauchy-Schwarz et projection",
        "body": "L'inégalité de Cauchy-Schwarz affirme $|\\langle x,y\\rangle|\\leq\\|x\\|\\|y\\|$, avec égalité si et seulement si les vecteurs sont liés. Pour $u\\ne0$, la projection de $v$ sur la droite dirigée par $u$ est $\\operatorname{proj}_u(v)=\\frac{\\langle v,u\\rangle}{\\|u\\|^2}u$."
      },
      {
        "title": "Orthogonalisation de Gram-Schmidt",
        "body": "À partir d'une famille libre, Gram-Schmidt construit une famille orthogonale engendrant les mêmes sous-espaces successifs. On retire à chaque nouveau vecteur ses projections sur les vecteurs orthogonaux déjà construits, puis on normalise pour obtenir une base orthonormée."
      }
    ],
    "theorems": [
      {
        "title": "Inégalité de Cauchy-Schwarz",
        "statement": "Pour tous vecteurs $x,y$ d'un espace préhilbertien réel, $|\\langle x,y\\rangle|\\leq\\|x\\|\\|y\\|$, avec égalité si et seulement si $x$ et $y$ sont liés.",
        "proof": "Si $y=0$, l'inégalité est immédiate. Sinon, pour tout réel $t$, la positivité donne $0\\leq\\|x-ty\\|^2=\\|x\\|^2-2t\\langle x,y\\rangle+t^2\\|y\\|^2$. En choisissant $t=\\langle x,y\\rangle/\\|y\\|^2$, on obtient $\\langle x,y\\rangle^2\\leq\\|x\\|^2\\|y\\|^2$. L'égalité a lieu exactement lorsque $x-ty=0$ pour ce choix de $t$, c'est-à-dire lorsque les vecteurs sont liés."
      }
    ],
    "methods": [
      "Pour vérifier l'orthogonalité, calculer le produit scalaire et non seulement comparer les coordonnées.",
      "Pour projeter, calculer séparément le numérateur $\\langle v,u\\rangle$ et le dénominateur $\\|u\\|^2$.",
      "Dans Gram-Schmidt, soustraire toutes les projections sur les vecteurs orthogonaux déjà construits avant de normaliser."
    ],
    "commonErrors": [
      "Oublier le carré dans le dénominateur de la formule de projection.",
      "Normaliser avant d'avoir retiré les composantes parallèles précédentes.",
      "Affirmer qu'une famille orthogonale est libre sans exclure les vecteurs nuls."
    ]
  },
  "series": {
    "lessonSections": [
      {
        "title": "Définition et sommes partielles",
        "body": "Une série numérique $\\sum u_n$ est étudiée à travers ses sommes partielles $S_N=\\sum_{n=0}^N u_n$. La série converge si et seulement si la suite $(S_N)$ converge vers une limite finie. Sa somme est alors cette limite."
      },
      {
        "title": "Condition nécessaire et séries de référence",
        "body": "Si une série converge, son terme général tend nécessairement vers 0. La réciproque est fausse : la série harmonique $\\sum 1/n$ diverge. Les séries géométriques convergent si et seulement si la raison a un module strictement inférieur à 1."
      },
      {
        "title": "Séries de Riemann et comparaisons",
        "body": "La série de Riemann $\\sum_{n\\geq1}1/n^p$ converge exactement lorsque $p>1$. Pour des termes positifs, les comparaisons et les équivalents permettent de transférer la convergence ou la divergence, sous les hypothèses adaptées."
      },
      {
        "title": "Critère intégral",
        "body": "Si $f$ est positive, continue et décroissante à partir d'un certain rang, la série $\\sum f(n)$ et l'intégrale impropre $\\int f(x)\\,dx$ sont de même nature. Ce critère donne notamment le résultat sur les séries de Riemann."
      }
    ],
    "theorems": [
      {
        "title": "Critère de Riemann",
        "statement": "Pour $p\\in\\mathbb R$, la série $\\sum_{n=1}^{+\\infty}1/n^p$ converge si et seulement si $p>1$.",
        "proof": "Si $p\\leq0$, le terme général ne tend pas vers 0, donc la série diverge. Si $p>0$, la fonction $x\\mapsto x^{-p}$ est positive, continue et décroissante sur $[1,+\\infty[$. Le critère intégral ramène la nature de la série à celle de $\\int_1^{+\\infty}x^{-p}\\,dx$. Pour $p\\ne1$, une primitive est $x^{1-p}/(1-p)$ ; l'intégrale converge exactement lorsque $p>1$. Pour $p=1$, elle diverge comme $\\ln x$. D'où le critère."
      }
    ],
    "methods": [
      "Commencer par vérifier si le terme général tend vers 0 : si ce n'est pas le cas, la série diverge immédiatement.",
      "Pour une série positive, chercher une comparaison avec une série géométrique ou une série de Riemann.",
      "N'utiliser le critère intégral qu'après avoir vérifié positivité, continuité et décroissance à partir d'un certain rang."
    ],
    "commonErrors": [
      "Croire que $u_n\\to0$ suffit à assurer la convergence de la série.",
      "Appliquer le critère intégral à une fonction qui n'est pas positive ou décroissante sans justification.",
      "Oublier de traiter séparément le cas $p\\leq0$ dans la série de Riemann."
    ]
  },
  "derivative": {
    "lessonSections": [
      {
        "title": "Définition et interprétation de la dérivée",
        "body": "La dérivée de $f$ en $a$ est la limite du taux d'accroissement $\\frac{f(a+h)-f(a)}h$ lorsque $h\\to0$, si cette limite existe. Elle mesure la variation instantanée de la fonction et donne le coefficient directeur de la tangente au graphe au point d'abscisse $a$."
      },
      {
        "title": "Règles de calcul",
        "body": "La dérivation est linéaire : $(af+bg)'=af'+bg'$. On utilise aussi $(fg)'=f'g+fg'$, $(f/g)'=(f'g-fg')/g^2$ lorsque $g\\ne0$, et la règle de chaîne $(f\\circ g)'=(f'\\circ g)g'$. Les domaines de dérivabilité doivent être vérifiés."
      },
      {
        "title": "Théorèmes de Rolle et des accroissements finis",
        "body": "Si une fonction est continue sur un segment et dérivable à l'intérieur, le théorème des accroissements finis relie la variation $f(b)-f(a)$ à une valeur de la dérivée. Le théorème de Rolle est le cas particulier où $f(a)=f(b)$."
      },
      {
        "title": "Dérivée et variations",
        "body": "Si $f'\\geq0$ sur un intervalle, alors $f$ y est croissante ; si $f'>0$, elle est strictement croissante. Un tableau de variations doit présenter le signe de la dérivée, les points critiques et les limites ou valeurs aux bornes."
      }
    ],
    "theorems": [
      {
        "title": "Théorème des accroissements finis",
        "statement": "Si $f$ est continue sur $[a,b]$ et dérivable sur $]a,b[$, alors il existe $c\\in]a,b[$ tel que $f(b)-f(a)=f'(c)(b-a)$.",
        "proof": "Considérons la fonction affine $\\ell(x)=f(a)+\\frac{f(b)-f(a)}{b-a}(x-a)$ et posons $g=f-\\ell$. Alors $g$ est continue sur $[a,b]$, dérivable sur $]a,b[$ et $g(a)=g(b)=0$. Le théorème de Rolle donne un $c$ intérieur tel que $g'(c)=0$. Or $g'(c)=f'(c)-\\frac{f(b)-f(a)}{b-a}$, d'où la formule."
      }
    ],
    "methods": [
      "Pour étudier les variations, factoriser $f'$ et dresser son signe avant de conclure.",
      "Pour une tangente en $a$, utiliser $y=f(a)+f'(a)(x-a)$.",
      "Pour prouver une inégalité entre valeurs de f, envisager le théorème des accroissements finis sur le segment concerné."
    ],
    "commonErrors": [
      "Confondre dérivée en un point et fonction dérivée.",
      "Appliquer le théorème des accroissements finis sans continuité sur le segment et dérivabilité à l'intérieur.",
      "Conclure à une stricte croissance à partir de $f'\\geq0$ sans information supplémentaire."
    ]
  },
  "integrals": {
    "lessonSections": [
      {
        "title": "Intégrale et aire algébrique",
        "body": "Pour une fonction continue sur un segment, l'intégrale représente une aire algébrique : les portions situées sous l'axe des abscisses comptent négativement. L'intégrale est linéaire et additive par rapport aux intervalles."
      },
      {
        "title": "Primitives et théorème fondamental",
        "body": "Une primitive de $f$ sur un intervalle est une fonction $F$ telle que $F'=f$. Si $F$ est une primitive de $f$ continue sur $[a,b]$, alors $\\int_a^b f(x)\\,dx=F(b)-F(a)$. Deux primitives sur un intervalle connexe diffèrent d'une constante."
      },
      {
        "title": "Techniques de calcul",
        "body": "L'intégration par parties découle de la dérivée d'un produit : $\\int_a^b u v'=[uv]_a^b-\\int_a^b u'v$. Le changement de variable permet de transformer une intégrale en adaptant simultanément l'expression et les bornes."
      },
      {
        "title": "Intégrales impropres",
        "body": "Une intégrale sur un intervalle non borné ou avec une singularité est définie comme une limite d'intégrales sur des segments. Elle converge si cette limite est finie. Pour $\\int_1^{+\\infty}x^{-p}dx$, la convergence a lieu exactement pour $p>1$ ; pour $\\int_0^1x^\\alpha dx$, elle a lieu exactement pour $\\alpha>-1$."
      }
    ],
    "theorems": [
      {
        "title": "Théorème fondamental de l'analyse",
        "statement": "Si $f$ est continue sur $[a,b]$ et si $F$ est une primitive de $f$, alors $\\int_a^b f(x)\\,dx=F(b)-F(a)$.",
        "proof": "La fonction $G(x)=\\int_a^x f(t)\\,dt$ est dérivable sur $]a,b[$ et vérifie $G'(x)=f(x)$ par le théorème fondamental. Comme $F'=f$, on a $(F-G)'=0$ ; la fonction $F-G$ est donc constante. En évaluant en $a$ et en $b$, on obtient $F(b)-F(a)=G(b)-G(a)=\\int_a^b f(t)dt$."
      }
    ],
    "methods": [
      "Avant de calculer, chercher une primitive et vérifier sa dérivée.",
      "Pour une intégration par parties, choisir u dont la dérivée se simplifie et v' dont on connaît une primitive.",
      "Pour une intégrale impropre, écrire explicitement la limite qui définit l'intégrale avant de calculer."
    ],
    "commonErrors": [
      "Oublier de soustraire la valeur de la primitive à la borne inférieure.",
      "Confondre aire géométrique et intégrale lorsque la fonction change de signe.",
      "Traiter une intégrale impropre comme une intégrale ordinaire sans étudier la limite."
    ]
  },
  "vector-spaces": {
    "lessonSections": [
      {
        "title": "Espaces vectoriels et sous-espaces",
        "body": "Un espace vectoriel est un ensemble muni d'une addition et d'une multiplication par les scalaires satisfaisant les axiomes usuels. Un sous-espace est une partie non vide stable par combinaison linéaire : si x,y appartiennent à F, alors $\\lambda x+\\mu y$ appartient à F pour tous scalaires."
      },
      {
        "title": "Combinaisons linéaires et engendré",
        "body": "Une famille engendre un espace si tout vecteur de cet espace est combinaison linéaire de ses éléments. Le sous-espace engendré par une famille est le plus petit sous-espace qui la contient. Décrire explicitement une combinaison linéaire est souvent le moyen le plus direct de prouver une inclusion."
      },
      {
        "title": "Familles libres et liées",
        "body": "Une famille $(v_1,\\ldots,v_n)$ est libre lorsque $\\lambda_1v_1+\\cdots+\\lambda_nv_n=0$ impose tous les coefficients nuls. Elle est liée lorsqu'il existe une relation non triviale. Une famille contenant le vecteur nul ou deux vecteurs proportionnels est automatiquement liée."
      },
      {
        "title": "Noyaux, images et dimension",
        "body": "Le noyau d'une application linéaire est un sous-espace de l'espace de départ et son image est un sous-espace de l'espace d'arrivée. En dimension finie, le théorème du rang relie la dimension du noyau et celle de l'image."
      }
    ],
    "theorems": [
      {
        "title": "Critère de sous-espace vectoriel",
        "statement": "Une partie non vide $F$ d'un espace vectoriel $E$ est un sous-espace si et seulement si, pour tous $x,y\\in F$ et tous scalaires $\\lambda,\\mu$, on a $\\lambda x+\\mu y\\in F$.",
        "proof": "Si F est un sous-espace, sa stabilité par addition et multiplication scalaire donne immédiatement la stabilité par combinaison linéaire. Réciproquement, supposons F non vide et stable par combinaisons linéaires. En prenant $\\lambda=\\mu=0$, on obtient $0_E\\in F$. En prenant successivement $(\\lambda,\\mu)=(1,1)$ et $(\\lambda,\\mu)=(\\alpha,0)$, on obtient la stabilité par addition et multiplication scalaire. F est donc un sous-espace."
      }
    ],
    "methods": [
      "Pour prouver qu'un ensemble défini par des équations linéaires est un sous-espace, le reconnaître comme noyau d'une application linéaire.",
      "Pour prouver qu'une famille est libre, partir d'une combinaison linéaire nulle et résoudre le système sur les coefficients.",
      "Pour montrer qu'une famille engendre, écrire un vecteur arbitraire comme combinaison de ses éléments."
    ],
    "commonErrors": [
      "Vérifier seulement la présence du vecteur nul sans prouver la stabilité.",
      "Confondre famille libre et famille génératrice.",
      "Conclure qu'une famille est une base sans vérifier à la fois liberté et génération."
    ]
  },
  "basis": {
    "lessonSections": [
      {
        "title": "Définition d'une base",
        "body": "Une base d'un espace vectoriel est une famille à la fois libre et génératrice. Elle permet d'écrire chaque vecteur de manière unique comme combinaison linéaire des vecteurs de base."
      },
      {
        "title": "Coordonnées dans une base",
        "body": "Si $B=(e_1,\\ldots,e_n)$ est une base, tout vecteur x s'écrit de façon unique $x=x_1e_1+\\cdots+x_ne_n$. Les scalaires $(x_1,\\ldots,x_n)$ sont les coordonnées de x dans B."
      },
      {
        "title": "Dimension",
        "body": "Dans un espace vectoriel de dimension finie, toutes les bases ont le même nombre d'éléments. Ce nombre est la dimension. Dans un espace de dimension n, toute famille libre possède au plus n vecteurs et toute famille génératrice possède au moins n vecteurs."
      },
      {
        "title": "Compléter et extraire une base",
        "body": "Une famille libre peut être complétée en une base en ajoutant des vecteurs adaptés. Une famille génératrice peut être réduite en retirant les vecteurs redondants. En pratique, le pivot de Gauss permet de réaliser ces opérations dans les espaces de coordonnées."
      }
    ],
    "theorems": [
      {
        "title": "Caractérisation d'une base en dimension n",
        "statement": "Dans un espace vectoriel de dimension n, une famille de n vecteurs est une base si et seulement si elle est libre, et si et seulement si elle est génératrice.",
        "proof": "Par le théorème de la dimension, une famille libre de n vecteurs dans un espace de dimension n est maximale et donc génératrice. Réciproquement, une famille génératrice de n vecteurs dans un espace de dimension n ne peut être liée, car on pourrait alors retirer un vecteur sans perdre la génération, ce qui contredirait le fait qu'une famille génératrice doit avoir au moins n éléments."
      }
    ],
    "methods": [
      "Pour tester une base de ℝⁿ, placer les vecteurs en colonnes d'une matrice et calculer son déterminant lorsque la matrice est carrée.",
      "Pour trouver les coordonnées d'un vecteur, résoudre le système linéaire correspondant.",
      "Pour déterminer une dimension, chercher une base explicite ou utiliser le théorème du rang."
    ],
    "commonErrors": [
      "Croire qu'une famille de n vecteurs est automatiquement une base dans un espace de dimension n sans vérifier sa liberté ou sa génération.",
      "Confondre coordonnées d'un vecteur et vecteur lui-même.",
      "Oublier que la dimension est définie par le nombre d'éléments d'une base, pas par une présentation particulière."
    ]
  },
  "linear-maps": {
    "lessonSections": [
      {
        "title": "Définition et premières propriétés",
        "body": "Une application $f:E\\to F$ est linéaire si elle respecte les combinaisons linéaires : $f(\\lambda x+\\mu y)=\\lambda f(x)+\\mu f(y)$. En particulier, $f(0_E)=0_F$ et $f(-x)=-f(x)$."
      },
      {
        "title": "Noyau et image",
        "body": "Le noyau $\\ker f=\\{x\\in E:f(x)=0\\}$ décrit les vecteurs envoyés sur zéro. L'image $\\operatorname{Im}f=\\{f(x):x\\in E\\}$ décrit les valeurs atteintes. Ce sont des sous-espaces vectoriels."
      },
      {
        "title": "Injectivité et surjectivité",
        "body": "Une application linéaire est injective si et seulement si son noyau est réduit au vecteur nul. Elle est surjective si son image est tout l'espace d'arrivée. En dimension finie, le théorème du rang permet de relier ces propriétés aux dimensions."
      },
      {
        "title": "Matrice d'une application linéaire",
        "body": "Une fois des bases choisies au départ et à l'arrivée, une application linéaire est représentée par une matrice. Les colonnes de cette matrice sont les coordonnées des images des vecteurs de la base de départ."
      }
    ],
    "theorems": [
      {
        "title": "Théorème du rang",
        "statement": "Si $f:E\\to F$ est linéaire et E est de dimension finie, alors $\\dim E=\\dim\\ker f+\\dim\\operatorname{Im}f$.",
        "proof": "Choisissons une base $(e_1,\\ldots,e_k)$ du noyau et complétons-la en une base $(e_1,\\ldots,e_k,e_{k+1},\\ldots,e_n)$ de E. Les vecteurs $f(e_{k+1}),\\ldots,f(e_n)$ engendrent l'image, car tout x se décompose dans cette base et les premiers vecteurs ont une image nulle. Ils sont aussi libres : une combinaison nulle de leurs images signifie que la combinaison correspondante appartient au noyau, donc que ses coefficients sur les vecteurs complémentaires sont nuls. Ils forment une base de l'image, de cardinal n−k. Ainsi dim Im f=n−k et la formule suit."
      }
    ],
    "methods": [
      "Pour déterminer le noyau, résoudre le système $f(x)=0$.",
      "Pour déterminer l'image, calculer les images d'une base et en extraire une famille génératrice puis une base.",
      "Pour prouver l'injectivité, montrer que le noyau est réduit à {0}."
    ],
    "commonErrors": [
      "Oublier de vérifier la linéarité avant d'utiliser les théorèmes sur noyau et image.",
      "Confondre le noyau, sous-espace du départ, et l'image, sous-espace de l'arrivée.",
      "Utiliser le théorème du rang sans vérifier que l'espace de départ est de dimension finie."
    ]
  },
  "matrices": {
    "lessonSections": [
      {
        "title": "Matrices et applications linéaires",
        "body": "Une matrice encode les coefficients d'une application linéaire dans des bases fixées. Le produit matriciel correspond à la composition des applications. Il n'est généralement pas commutatif : AB et BA ne sont pas nécessairement égaux."
      },
      {
        "title": "Opérations et systèmes",
        "body": "L'addition et la multiplication par un scalaire se font coefficient par coefficient. Le produit AB est défini lorsque le nombre de colonnes de A égale le nombre de lignes de B. Résoudre $AX=b$ revient à résoudre un système linéaire."
      },
      {
        "title": "Déterminant",
        "body": "Le déterminant est défini pour les matrices carrées. Il change de signe lorsqu'on échange deux lignes, est multiplié par le facteur d'une ligne multipliée par un scalaire, et ne change pas lorsqu'on ajoute à une ligne un multiple d'une autre. Pour une matrice triangulaire, il est le produit des coefficients diagonaux."
      },
      {
        "title": "Inversibilité",
        "body": "Une matrice carrée est inversible si elle représente une application linéaire bijective. Pour une matrice 2×2, le déterminant donne un critère immédiat : elle est inversible si et seulement si son déterminant est non nul."
      }
    ],
    "theorems": [
      {
        "title": "Critère du déterminant",
        "statement": "Une matrice carrée A est inversible si et seulement si $\\det(A)\\ne0$.",
        "proof": "Le déterminant est nul exactement lorsque les colonnes de A sont linéairement dépendantes. Cela équivaut à l'existence d'un vecteur non nul x tel que Ax=0, donc à un noyau non trivial. L'application linéaire associée n'est alors pas injective et ne peut être inversible. Réciproquement, si le déterminant est non nul, les colonnes sont libres ; en nombre égal à la dimension, elles forment une base, donc l'application est bijective et A est inversible."
      }
    ],
    "methods": [
      "Pour résoudre un système, utiliser l'élimination de Gauss plutôt que calculer explicitement une inverse sauf si cela est demandé.",
      "Pour calculer un déterminant, exploiter les opérations élémentaires sur les lignes en notant leur effet sur le déterminant.",
      "Vérifier les dimensions avant tout produit matriciel."
    ],
    "commonErrors": [
      "Supposer que AB=BA.",
      "Oublier qu'un déterminant n'est défini que pour une matrice carrée.",
      "Modifier une ligne lors d'un calcul de déterminant sans suivre l'effet sur sa valeur."
    ]
  },
  "eigenvalues": {
    "lessonSections": [
      {
        "title": "Valeurs propres et vecteurs propres",
        "body": "Un scalaire $\\lambda$ est une valeur propre de A s'il existe un vecteur non nul x tel que $Ax=\\lambda x$. Les vecteurs propres associés forment, avec le vecteur nul, le sous-espace propre $E_\\lambda=\\ker(A-\\lambda I)$."
      },
      {
        "title": "Polynôme caractéristique",
        "body": "Les valeurs propres sont les racines du polynôme caractéristique $\\chi_A(\\lambda)=\\det(A-\\lambda I)$ (ou de $\\det(\\lambda I-A)$ selon la convention). Il faut ensuite calculer chaque espace propre en résolvant $(A-\\lambda I)x=0$."
      },
      {
        "title": "Diagonalisation",
        "body": "Une matrice est diagonalisable lorsqu'il existe une base de vecteurs propres. Dans cette base, sa matrice est diagonale. Pour une matrice n×n, il faut donc disposer de n vecteurs propres linéairement indépendants."
      },
      {
        "title": "Critères pratiques",
        "body": "Des valeurs propres deux à deux distinctes fournissent des vecteurs propres linéairement indépendants. Si une valeur propre est multiple, il faut comparer la dimension de son espace propre à sa multiplicité algébrique. Une matrice symétrique réelle est toujours diagonalisable dans une base orthonormée."
      }
    ],
    "theorems": [
      {
        "title": "Indépendance des vecteurs propres associés à des valeurs propres distinctes",
        "statement": "Des vecteurs propres associés à des valeurs propres deux à deux distinctes sont linéairement indépendants.",
        "proof": "On raisonne par récurrence sur le nombre de vecteurs. Le résultat est immédiat pour un seul vecteur propre. Supposons une relation $\\sum_{i=1}^n a_i v_i=0$, où les $v_i$ sont associés à des valeurs propres distinctes $\\lambda_i$. En appliquant A, puis en soustrayant $\\lambda_n$ fois la relation initiale, on obtient $\\sum_{i=1}^{n-1}a_i(\\lambda_i-\\lambda_n)v_i=0$. Par hypothèse de récurrence, chaque coefficient est nul. Comme $\\lambda_i\\ne\\lambda_n$, on a $a_i=0$ pour i<n, puis la relation initiale donne $a_n=0$."
      }
    ],
    "methods": [
      "Calculer le polynôme caractéristique, factoriser, puis résoudre chaque système propre séparément.",
      "Pour conclure à la diagonalisabilité, compter des vecteurs propres indépendants et non seulement des valeurs propres distinctes.",
      "Vérifier une diagonalisation en contrôlant $AP=PD$ et l'inversibilité de P."
    ],
    "commonErrors": [
      "Confondre multiplicité algébrique et dimension de l'espace propre.",
      "Chercher des vecteurs propres en résolvant $Ax=0$ au lieu de $(A-\\lambda I)x=0$.",
      "Conclure qu'une matrice est diagonalisable parce que son polynôme caractéristique est scindé, sans vérifier les dimensions des espaces propres."
    ]
  }
}
for (const [id, extra] of Object.entries(courseEnrichments)) {
  const existing = window.TOPICS.find(old => old.id === id);
  if (existing) Object.assign(existing, extra);
}
for (const t of topics) {
  if (!window.TOPICS.some(old => old.id === t.id)) window.TOPICS.push(t);
}
const addedExerciseSolutions = {
  "m4-62": [
    "Une période T>0 doit vérifier f(x+T)=f(x) pour tout x.",
    "Comme le cosinus est 2π-périodique, il faut que 4(x+T)=4x+2πk pour un entier k. La plus petite valeur positive correspond à k=1.",
    "On obtient 4T=2π, donc T=π/2. C'est la période fondamentale."
  ],
  "m4-63": [
    "Le point du cercle trigonométrique associé à l'angle x a pour coordonnées (cos x,sin x).",
    "Le cercle unité est défini par l'équation X²+Y²=1.",
    "En remplaçant X et Y par les coordonnées du point, on obtient cos²x+sin²x=1 pour tout réel x."
  ],
  "m4-64": [
    "On isole le cosinus : 2cos x−1=0 équivaut à cos x=1/2.",
    "Sur le cercle trigonométrique, le cosinus est l'abscisse. L'abscisse 1/2 est atteinte aux angles π/3 et −π/3 modulo 2π.",
    "Dans l'intervalle [0,2π], ces deux angles sont π/3 et 5π/3. Ce sont les deux solutions."
  ],
  "m4-65": [
    "On applique Taylor-Young à f(x)=eˣ au voisinage de 0, à l'ordre 2.",
    "On a f(0)=1, f'(x)=eˣ et f''(x)=eˣ, donc f'(0)=f''(0)=1.",
    "La formule donne eˣ=1+x+x²/2+o(x²) lorsque x tend vers 0."
  ],
  "m4-66": [
    "On utilise le développement limité connu ln(1+x)=x−x²/2+o(x²) lorsque x tend vers 0.",
    "En soustrayant x, on obtient ln(1+x)−x=−x²/2+o(x²).",
    "On factorise le terme principal : −x²/2(1+o(1)). Le facteur entre parenthèses tend vers 1, donc ln(1+x)−x est équivalent à −x²/2."
  ],
  "m4-67": [
    "On part de l'identité géométrique finie : (1−x)(1+x+x²+x³)=1−x⁴.",
    "Pour x≠1, on divise par 1−x : 1/(1−x)=1+x+x²+x³+x⁴/(1−x).",
    "Au voisinage de 0, 1/(1−x) reste borné, donc x⁴/(1−x)=O(x⁴)=o(x³).",
    "Le développement limité à l'ordre 3 est donc 1+x+x²+x³+o(x³)."
  ],
  "m4-68": [
    "Le théorème de Heine-Borel, dans ℝ, affirme qu'un ensemble est compact si et seulement s'il est fermé et borné.",
    "L'intervalle [0,1] est fermé puisqu'il contient ses deux extrémités.",
    "Il est borné car tout élément x vérifie 0≤x≤1.",
    "Les deux conditions sont réunies : [0,1] est compact."
  ],
  "m4-69": [
    "Pour montrer que ]0,1[ n'est pas fermé, considérons la suite uₙ=1/n pour n≥2.",
    "Chaque terme appartient à ]0,1[, mais uₙ tend vers 0.",
    "Or 0 n'appartient pas à ]0,1[. L'intervalle n'est donc pas fermé.",
    "Par le critère de Heine-Borel dans ℝ, il n'est pas compact."
  ],
  "m4-70": [
    "Le théorème de l'image continue d'un compact indique que l'image d'un compact par une fonction continue est compacte.",
    "Comme K est compact et f continue sur K, l'ensemble f(K) est compact dans ℝ.",
    "Dans ℝ, un compact est fermé et borné. Comme K est non vide, le théorème des bornes atteintes assure aussi que f atteint son minimum et son maximum sur K."
  ],
  "m4-71": [
    "Pour z=a+ib, le conjugué est a−ib. Ici z=3−4i, donc son conjugué est 3+4i.",
    "Le module vaut √(a²+b²). On obtient |z|=√(3²+(−4)²)=√(9+16)=√25=5."
  ],
  "m4-72": [
    "On développe le produit : (2+i)(3−2i)=6−4i+3i−2i².",
    "Comme i²=−1, le terme −2i² vaut +2.",
    "On regroupe les parties réelle et imaginaire : 6+2−i=8−i."
  ],
  "m4-73": [
    "On ramène tout dans le membre de gauche : z²=−1 équivaut à z²+1=0.",
    "Dans ℂ, z²+1=(z−i)(z+i), puisque i²=−1.",
    "Un produit est nul si et seulement si l'un de ses facteurs est nul. Les solutions sont donc z=i et z=−i."
  ],
  "m4-74": [
    "On cherche deux nombres dont le produit vaut 6 et la somme vaut 5. Les nombres 2 et 3 conviennent.",
    "On factorise alors X²−5X+6=(X−2)(X−3), car le développement redonne X²−5X+6."
  ],
  "m4-75": [
    "Un produit de facteurs est nul si et seulement si au moins un facteur est nul.",
    "Dans P(X)=(X−1)²(X+2), le facteur X−1 s'annule en X=1 et apparaît à la puissance 2 : la racine 1 est de multiplicité 2.",
    "Le facteur X+2 s'annule en X=−2 et apparaît à la puissance 1 : la racine −2 est de multiplicité 1."
  ],
  "m4-76": [
    "Le théorème du reste affirme que le reste de la division euclidienne d'un polynôme P par X−a est P(a).",
    "Ici a=2, donc le reste est P(2).",
    "On calcule P(2)=2³−2×2+4=8−4+4=8. Le reste est 8."
  ],
  "m4-77": [
    "On additionne les deux équations : (2x+y)+(x−y)=5+1, d'où 3x=6 et x=2.",
    "On remplace x par 2 dans la deuxième équation : 2−y=1, donc y=1.",
    "Le couple (2,1) vérifie les deux équations ; c'est l'unique solution puisque l'élimination a déterminé successivement x puis y."
  ],
  "m4-78": [
    "La deuxième équation 2x−y=0 donne y=2x.",
    "On remplace dans la première : x+2(2x)=5, donc 5x=5 et x=1.",
    "On en déduit y=2. La solution du système est (1,2)."
  ],
  "m4-79": [
    "La première équation est x+y=1. En la multipliant par 2, on obtient nécessairement 2x+2y=2.",
    "La deuxième équation impose pourtant 2x+2y=3.",
    "Un même nombre ne peut être égal à la fois à 2 et à 3 : les deux équations sont incompatibles. Le système n'a aucune solution."
  ],
  "m4-80": [
    "Un dé équilibré possède six issues équiprobables : 1,2,3,4,5,6.",
    "Les issues favorables à l'événement « obtenir un nombre pair » sont 2,4 et 6, soit trois issues.",
    "La probabilité est donc 3/6=1/2."
  ],
  "m4-81": [
    "Comme P(B)=0,3 est strictement positif, la probabilité conditionnelle P(A|B) est définie.",
    "Par définition, P(A|B)=P(A∩B)/P(B).",
    "On remplace par les valeurs données : 0,12/0,3=0,4. Donc P(A|B)=0,4."
  ],
  "m4-82": [
    "Pour une variable de Bernoulli de paramètre p, l'espérance vaut E(X)=p.",
    "Sa variance vaut V(X)=p(1−p).",
    "Avec p=0,3, on obtient E(X)=0,3 et V(X)=0,3×0,7=0,21."
  ],
  "m4-83": [
    "On résout y'=3y. L'équation est à variables séparables ; pour une solution non nulle, y'/y=3.",
    "En intégrant, ln|y|=3x+C₀, ce qui donne y=Ce^{3x}. La solution nulle est également obtenue pour C=0.",
    "Toutes les solutions sur ℝ sont donc y(x)=Ce^{3x}, où C est une constante réelle."
  ],
  "m4-84": [
    "La solution générale de y'=3y est y(x)=Ce^{3x}.",
    "La condition initiale y(0)=2 donne C e⁰=C=2.",
    "La solution qui satisfait la condition initiale est donc y(x)=2e^{3x}. On vérifie bien que sa dérivée vaut 6e^{3x}=3y(x)."
  ],
  "m4-85": [
    "L'équation y'=2x demande une fonction dont la dérivée est 2x.",
    "Une primitive de 2x est x². Toutes les primitives sur ℝ diffèrent d'une constante.",
    "Les solutions sont donc y(x)=x²+C, avec C∈ℝ."
  ],
  "m4-86": [
    "Dans ℝ² muni du produit scalaire usuel, ⟨(a,b),(c,d)⟩=ac+bd.",
    "On applique la formule à u=(1,2) et v=(3,−1) : ⟨u,v⟩=1×3+2×(−1).",
    "Le calcul donne 3−2=1."
  ],
  "m4-87": [
    "Deux vecteurs sont orthogonaux si et seulement si leur produit scalaire est nul.",
    "On calcule ⟨u,v⟩=1×1+1×(−1)=1−1=0.",
    "Le produit scalaire étant nul, u et v sont orthogonaux."
  ],
  "m4-88": [
    "La projection orthogonale de v sur la droite vectorielle dirigée par u≠0 est projᵤ(v)=(⟨v,u⟩/‖u‖²)u.",
    "Ici ⟨v,u⟩=2×1+1×1=3 et ‖u‖²=1²+1²=2.",
    "Le coefficient vaut 3/2. Ainsi projᵤ(v)=(3/2)(1,1)=(3/2,3/2)."
  ],
  "m4-89": [
    "Il s'agit d'une série géométrique de premier terme 1 et de raison q=1/3.",
    "Une série géométrique Σqⁿ converge si et seulement si |q|<1. Ici |q|=1/3<1, donc elle converge.",
    "Sa somme, en commençant à n=0, vaut 1/(1−q)=1/(1−1/3)=3/2."
  ],
  "m4-90": [
    "On regroupe les termes positifs par blocs dyadiques. Pour chaque entier k≥0, considérons les indices n de 2ᵏ+1 à 2ᵏ⁺¹.",
    "Ce bloc contient 2ᵏ termes, et chacun vérifie 1/n≥1/2ᵏ⁺¹. Sa somme est donc au moins 2ᵏ/2ᵏ⁺¹=1/2.",
    "Chaque bloc apporte au moins 1/2. En additionnant un nombre arbitraire de blocs, les sommes partielles deviennent arbitrairement grandes.",
    "La série harmonique diverge donc vers +∞."
  ],
  "m4-91": [
    "Si p≤0, alors 1/nᵖ ne tend pas vers 0 : la condition nécessaire de convergence d'une série n'est pas satisfaite. La série diverge.",
    "Supposons p>0. La fonction x↦x⁻ᵖ est positive, continue et décroissante sur [1,+∞[ ; le critère intégral s'applique.",
    "L'intégrale impropre ∫₁⁺∞ x⁻ᵖ dx converge exactement lorsque p>1 : pour p≠1, sa primitive est x^{1−p}/(1−p), et pour p=1 elle diverge comme ln x.",
    "La série de Riemann Σ1/nᵖ converge donc si et seulement si p>1."
  ]
};
const add=(id,topic,difficulty,title,question,answer,hint,category)=>window.EXERCISES.push({id,topic,category:category||(["polynomials","linear-systems","euclidean","vector-spaces","linear-maps","matrices","eigenvalues","basis"].includes(topic)?"Algèbre":"Analyse"),difficulty,title,question,hints:[hint],answer,solutionSteps:addedExerciseSolutions[id]||[answer],check:"Justifie la propriété utilisée, vérifie ses hypothèses et termine par une conclusion explicite."});
add("m4-62","trigonometry","Facile","Périodicité du cosinus","Déterminer la période fondamentale de $f(x)=\\cos(4x)$.","On cherche le plus petit T>0 tel que 4T=2π. Donc $\\boxed{T=\\pi/2}$.","Rappelle la période de cos(x).");
add("m4-63","trigonometry","Intermédiaire","Identité fondamentale","Démontrer que $\\cos^2x+\\sin^2x=1$.","Le point associé à x sur le cercle unité a pour coordonnées (cos x,sin x) et vérifie X²+Y²=1. Donc $\\boxed{\\cos^2x+\\sin^2x=1}$.","Utilise l'équation du cercle unité.");
add("m4-64","trigonometry","Avancé","Équation trigonométrique","Résoudre $2\\cos x-1=0$ sur $[0,2\\pi]$.","L'équation équivaut à cos x=1/2. Sur le cercle trigonométrique, $\\boxed{x=\\pi/3\\text{ ou }5\\pi/3}$.","Le cosinus est l'abscisse sur le cercle.");
add("m4-65","taylor","Facile","DL de l'exponentielle","Donner le DL de $e^x$ à l'ordre 2 en 0.","Taylor-Young donne f(0)+f'(0)x+f''(0)x²/2+o(x²). Les dérivées de exp valent 1 en 0, donc $\\boxed{e^x=1+x+x^2/2+o(x^2)}$.","Écris Taylor-Young à l'ordre 2.");
add("m4-66","taylor","Intermédiaire","Équivalent logarithmique","Déterminer un équivalent de $\\ln(1+x)-x$ lorsque x tend vers 0.","Comme $\\ln(1+x)=x-x^2/2+o(x^2)$, on obtient $\\boxed{\\ln(1+x)-x\\sim-x^2/2}$.","Le terme d'ordre 1 s'annule.");
add("m4-67","taylor","Avancé","DL d'une fraction rationnelle","Établir le DL de $1/(1-x)$ à l'ordre 3 en 0.","L'identité $1/(1-x)=1+x+x^2+x^3+x^4/(1-x)$ est exacte. Le reste est O(x⁴), donc o(x³). Ainsi $\\boxed{1+x+x^2+x^3+o(x^3)}$.","Utilise l'identité géométrique finie.");
add("m4-68","compactness","Facile","Segment compact","Justifier que [0,1] est compact dans R.","[0,1] est fermé et borné. Par Heine-Borel, une partie de R est compacte si et seulement si elle est fermée et bornée. Donc [0,1] est compact.","Applique le critère fermé et borné.");
add("m4-69","compactness","Intermédiaire","Intervalle ouvert non compact","Montrer que ]0,1[ n'est pas compact dans R.","La suite 1/n (n≥2) appartient à ]0,1[ et converge vers 0, extérieur à l'intervalle. Celui-ci n'est donc pas fermé ; par Heine-Borel, il n'est pas compact.","Cherche une suite qui converge vers un point extérieur.");
add("m4-70","compactness","Avancé","Image continue d'un compact","Si K est compact non vide et f:K→R continue, que peut-on dire de f(K) ?","L'image continue d'un compact est compacte. Donc f(K) est fermé et borné dans R ; f est ainsi bornée et atteint ses bornes sur K.","Utilise le théorème de l'image continue d'un compact.");
add("m4-71","complex","Facile","Module et conjugué","Pour z=3−4i, calculer son conjugué et son module.","$\\bar z=3+4i$ et $|z|=\\sqrt{3^2+(-4)^2}=\\boxed5$.","Rappelle les définitions.");
add("m4-72","complex","Intermédiaire","Produit de complexes","Calculer $(2+i)(3-2i)$.","$6-4i+3i-2i^2=6-i+2=\\boxed{8-i}$ puisque i²=−1.","Développe et remplace i² par −1.");
add("m4-73","complex","Avancé","Racines carrées de −1","Résoudre z²=−1 dans C.","$z^2+1=(z-i)(z+i)=0$. Donc $\\boxed{z=i\\text{ ou }z=-i}$.","Factorise z²+1.");
add("m4-74","polynomials","Facile","Factorisation","Factoriser $P(X)=X^2-5X+6$.","Les nombres 2 et 3 ont pour somme 5 et produit 6. Donc $\\boxed{P(X)=(X-2)(X-3)}$.","Cherche deux facteurs de 6 dont la somme vaut 5.");
add("m4-75","polynomials","Intermédiaire","Racines et multiplicités","Déterminer les racines et leurs multiplicités pour $P(X)=(X-1)^2(X+2)$.","La racine 1 a multiplicité 2 et la racine −2 a multiplicité 1, directement d'après la factorisation.","La puissance du facteur indique la multiplicité.");
add("m4-76","polynomials","Avancé","Théorème du reste","Déterminer le reste de la division de $P(X)=X^3-2X+4$ par X−2.","Le reste vaut P(2)=8−4+4=$\\boxed8$.","Le reste de la division par X−a est P(a).");
add("m4-77","linear-systems","Facile","Système à deux inconnues","Résoudre $\\begin{cases}2x+y=5\\\\x-y=1\\end{cases}$.","En additionnant, 3x=6 donc x=2. Puis x−y=1 donne y=1. La solution est $\\boxed{(2,1)}$.","Additionne les équations pour éliminer y.");
add("m4-78","linear-systems","Intermédiaire","Élimination","Résoudre $\\begin{cases}x+2y=5\\\\2x-y=0\\end{cases}$.","La deuxième équation donne y=2x. En substituant, 5x=5, donc x=1 et y=2. Solution : $\\boxed{(1,2)}$.","Isole une inconnue puis substitue.");
add("m4-79","linear-systems","Avancé","Système incompatible","Étudier $\\begin{cases}x+y=1\\\\2x+2y=3\\end{cases}$.","Le double de la première équation donne 2x+2y=2, en contradiction avec la seconde. Le système est incompatible et n'a aucune solution.","Compare la deuxième équation au double de la première.");
add("m4-80","probability","Facile","Équiprobabilité","On lance un dé équilibré. Quelle est la probabilité d'obtenir un nombre pair ?","Les issues favorables sont 2,4,6, soit 3 sur 6. La probabilité vaut $\\boxed{1/2}$.","Compte les issues favorables.");
add("m4-81","probability","Intermédiaire","Probabilité conditionnelle","P(A∩B)=0,12 et P(B)=0,3. Calculer P(A|B).","$P(A|B)=P(A\\cap B)/P(B)=0,12/0,3=\\boxed{0,4}$.","Applique la définition.");
add("m4-82","probability","Avancé","Espérance et variance","X suit une loi de Bernoulli de paramètre p=0,3. Calculer E(X) et V(X).","Pour Bernoulli(p), E(X)=p et V(X)=p(1−p). Donc $\\boxed{E(X)=0,3}$ et $\\boxed{V(X)=0,21}$.","Utilise les formules de Bernoulli.");
add("m4-83","differential-equations","Facile","Équation y'=ay","Résoudre y'=3y sur R.","Les solutions de y'=ay sont y=Ce^{ax}. Ici $\\boxed{y=Ce^{3x}}$, C réel.","Reconnais l'équation différentielle homogène.");
add("m4-84","differential-equations","Intermédiaire","Condition initiale","Résoudre y'=3y avec y(0)=2.","La solution générale est y=Ce^{3x}. La condition initiale impose C=2. Donc $\\boxed{y=2e^{3x}}$.","Utilise la condition initiale pour déterminer C.");
add("m4-85","differential-equations","Avancé","Primitive comme solution","Résoudre y'=2x sur R.","Les solutions sont toutes les primitives de 2x : $\\boxed{y=x^2+C}$, C réel.","Intègre les deux membres.");
add("m4-86","euclidean","Facile","Produit scalaire","Calculer le produit scalaire de u=(1,2) et v=(3,−1) dans R².","$\\langle u,v\\rangle=1\\times3+2\\times(-1)=\\boxed1$.","Multiplie les coordonnées correspondantes puis additionne.","Algèbre");
add("m4-87","euclidean","Intermédiaire","Orthogonalité","Montrer que u=(1,1) et v=(1,−1) sont orthogonaux.","$\\langle u,v\\rangle=1-1=0$. Par définition, les deux vecteurs sont orthogonaux.","Calcule leur produit scalaire.","Algèbre");
add("m4-88","euclidean","Avancé","Projection orthogonale","Projeter v=(2,1) sur la droite dirigée par u=(1,1).","$\\operatorname{proj}_u(v)=\\frac{\\langle v,u\\rangle}{\\|u\\|^2}u=\\frac32(1,1)=\\boxed{(3/2,3/2)}$.","Applique la formule de projection orthogonale.","Algèbre");
add("m4-89","series","Facile","Série géométrique","Étudier la convergence de $\\sum_{n=0}^{+\\infty}(1/3)^n$ et calculer sa somme.","Série géométrique de raison 1/3, de module inférieur à 1 : elle converge et sa somme vaut $1/(1-1/3)=\\boxed{3/2}$.","Reconnais une série géométrique.");
add("m4-90","series","Intermédiaire","Série harmonique","Montrer que $\\sum_{n=1}^{+\\infty}1/n$ diverge.","On regroupe les termes par blocs : 1/3+1/4≥1/2, 1/5+…+1/8≥1/2, etc. Les sommes partielles sont non bornées ; la série harmonique diverge.","La condition uₙ→0 est nécessaire mais ne suffit pas.");
add("m4-91","series","Avancé","Série de Riemann","Pour p réel, déterminer quand $\\sum_{n=1}^{+\\infty}1/n^p$ converge.","La série de Riemann converge si et seulement si $\\boxed{p>1}$. Pour p≤0 le terme général ne tend pas vers 0 ; pour p>0 le critère intégral donne p>1.","Distingue p≤0 et p>0.");
window.FLASHCARDS.push(
 {topic:"trigonometry",front:"Identité fondamentale",back:"Pour tout réel x : cos²(x)+sin²(x)=1."},
 {topic:"taylor",front:"DL de exp en 0 à l'ordre 2",back:"eˣ=1+x+x²/2+o(x²)."},
 {topic:"compactness",front:"Compacité dans R",back:"Une partie de R est compacte si et seulement si elle est fermée et bornée."},
 {topic:"multivariable",front:"Ligne de niveau",back:"La ligne de niveau c est l'ensemble des points (x,y) tels que f(x,y)=c."},
 {topic:"complex",front:"Module d'un complexe",back:"Pour z=a+ib : |z|=√(a²+b²) et z z̄=|z|²."},
 {topic:"polynomials",front:"Théorème du facteur",back:"P(a)=0 si et seulement si X−a divise P(X)."},
 {topic:"linear-systems",front:"Forme matricielle",back:"Un système linéaire s'écrit AX=b ; les opérations élémentaires sur les lignes préservent les solutions."},
 {topic:"probability",front:"Probabilité conditionnelle",back:"Si P(B)>0 : P(A|B)=P(A∩B)/P(B)."},
 {topic:"differential-equations",front:"Équation y'=ay",back:"Les solutions sont y(x)=Ce^{ax}, avec C réel."},
 {topic:"euclidean",front:"Projection sur une droite",back:"Pour u≠0 : projᵤ(v)=⟨v,u⟩u/||u||²."}
);
window.FLASHCARDS.push(
 {topic:"multivariable",front:"Dérivée partielle",back:"$\\frac{\\partial f}{\\partial x}(a,b)$ dérive par rapport à $x$ en considérant $y=b$ comme une constante."},
 {topic:"multivariable",front:"Gradient d'une fonction de deux variables",back:"$\\nabla f(x,y)=\\left(\\frac{\\partial f}{\\partial x}(x,y),\\frac{\\partial f}{\\partial y}(x,y)\\right)$. Il indique la direction de plus forte augmentation locale lorsque $f$ est différentiable."},
 {topic:"multivariable",front:"Condition nécessaire d'extremum intérieur",back:"Si $f$ est différentiable sur un ouvert et possède un extremum local en un point intérieur $a$, alors $\\nabla f(a)=0$. La réciproque est fausse en général."},
 {topic:"multivariable",front:"Matrice hessienne",back:"Pour $f(x,y)$ de classe $C^2$, $H_f=\\begin{pmatrix}f_{xx}&f_{xy}\\\\f_{yx}&f_{yy}\\end{pmatrix}$. Elle rassemble les dérivées partielles secondes."},
 {topic:"multivariable",front:"Critère hessien en dimension 2",back:"Au point critique : si $D=\\det H_f>0$ et $f_{xx}>0$, minimum local ; si $D>0$ et $f_{xx}<0$, maximum local ; si $D<0$, point selle. Si $D=0$, le critère ne conclut pas."}
);
/* Repoint the original courses at their real exercise identifiers. */
const links={limits:"m4-1",continuity:"m4-4",derivative:"m4-7",integrals:"m4-14",series:"m4-89","vector-spaces":"m4-17",basis:"m4-19","linear-maps":"m4-21",matrices:"m4-23",eigenvalues:"m4-34"};
for(const t of window.TOPICS) if(links[t.id]) t.exerciseId=links[t.id];
/* Improve terse corrections so the answer teaches the reasoning, not only the result. */
const fixes={
"m4-1":"Soit ε>0. Choisissons N entier tel que N>3/ε. Pour n≥N, 0≤3/(n+2)≤3/n≤3/N<ε. Par définition, uₙ tend vers 0.",
"m4-2":"On divise numérateur et dénominateur par n : uₙ=(2+1/n)/(1+3/n). Comme 1/n→0 et que le dénominateur tend vers 1≠0, le quotient tend vers 2.",
"m4-4":"f(x)=3x−2 est affine, donc continue sur R. Directement, |f(x)−f(a)|=3|x−a|→0 lorsque x→a.",
"m4-5":"f(0)=0 et |f(x)−f(0)|=|x|→0 lorsque x→0. Donc lim f(x)=f(0) : f est continue en 0.",
"m4-7":"Par linéarité et (xⁿ)'=nxⁿ⁻¹, (x³)'=3x² et (−2x)'=−2. Ainsi f'(x)=3x²−2.",
"m4-8":"f(2)=4 et f'(2)=4. La tangente en a a pour équation y=f(a)+f'(a)(x−a), donc y=4+4(x−2)=4x−4.",
"m4-10":"(sin x)'=cos x et |cos x|≤1 pour tout réel x. M=1 convient et est optimal puisque |cos 0|=1.",
"m4-13":"g(x)=x³+x−1 est continue sur [0,1], g(0)=−1 et g(1)=1. Le théorème des valeurs intermédiaires donne une racine dans ]0,1[.",
"m4-14":"Une primitive de 2x est F(x)=x². Donc l'intégrale vaut F(2)−F(0)=4.",
"m4-15":"Une primitive de 3x²+2x est F(x)=x³+x². L'intégrale vaut F(1)−F(0)=2.",
"m4-17":"(0,0) appartient à F. Si (x,0),(y,0)∈F, alors λ(x,0)+μ(y,0)=(λx+μy,0)∈F. F est stable par combinaison linéaire et contient 0 : c'est un sous-espace.",
"m4-19":"Si λ(1,0)+μ(0,1)=(0,0), alors λ=μ=0. La seule combinaison linéaire nulle est triviale : la famille est libre.",
"m4-20":"(2,2)=2(1,1). Les vecteurs sont proportionnels, donc la famille est liée.",
"m4-21":"Pour u,v et λ,μ, f(λu+μv)=2(λu+μv)=λf(u)+μf(v). La propriété de linéarité est vérifiée.",
"m4-22":"Le noyau vérifie x+y=0 et x−y=0. En additionnant, x=0, puis y=0. Ainsi ker(f)={(0,0)}.",
"m4-23":"Pour une matrice 2×2, det(A)=ad−bc. Ici 3×4−1×2=10.",
"m4-25":"Tout (x,y)=(x,0)+(0,y), donc la somme des axes est R². Leur intersection vaut {(0,0)}. Ils sont donc supplémentaires.",
"m4-26":"Le produit scalaire canonique vaut 1×3+2×(−1)=1.",
"m4-27":"Le produit scalaire vaut 1−1=0 : les vecteurs sont orthogonaux. Pythagore donne ||(1,1)+(1,−1)||²=2+2=4, ce qui correspond à ||(2,0)||².",
"m4-29":"projᵤ(v)=⟨v,u⟩u/||u||². Ici le numérateur vaut 2 et le dénominateur 1, donc projᵤ₁(v₂)=(2,0).",
"m4-30":"La projection de (1,2) sur e₁=(1,0) vaut (1,0). Le résidu est (0,2), qui se normalise en (0,1). La base orthonormée obtenue est la base canonique.",
"m4-34":"La matrice est diagonale dans la base canonique : Ae₁=2e₁ et Ae₂=3e₂. Les valeurs propres sont 2 et 3 et une base propre est (e₁,e₂).",
"m4-39":"Pour tous x,y, l'inégalité triangulaire d'une norme est ||x+y||≤||x||+||y||.",
"m4-41":"f est continue sur [−1,1], dérivable à l'intérieur et f(−1)=f(1). Par Rolle, il existe c tel que f'(c)=0. Or f'(x)=2x, donc c=0.",
"m4-44":"Pour x≠0, |f(x)−f(0)|=|x sin(1/x)|≤|x|→0. Par encadrement, f(x)→0=f(0) : f est continue en 0.",
"m4-55":"||x||≤||x−y||+||y|| donne ||x||−||y||≤||x−y||. En échangeant x et y, on obtient l'inégalité opposée ; donc |||x||−||y|||≤||x−y||."
};
for(const [id,answer] of Object.entries(fixes)) if(byId[id]) byId[id].answer=answer;

/* Compléter les corrections de démonstration et rendre les indices réellement progressifs. */
const expandedAnswers={
"m4-11":"La fonction exp est continue sur [a,b] et dérivable sur ]a,b[. Par le théorème des accroissements finis, il existe c∈]a,b[ tel que eᵇ−eᵃ=eᶜ(b−a). Comme a≤c≤b et que exp est croissante, eᶜ≤eᵇ. Puisque b−a≥0, on obtient 0≤eᵇ−eᵃ≤eᵇ(b−a), ce qui donne l'inégalité demandée.",
"m4-31":"La fonction cos est de période fondamentale 2π. Pour cos(4x), une période T vérifie cos(4(x+T))=cos(4x), donc 4T doit être un multiple de 2π. La plus petite période strictement positive est donc T=2π/4=π/2.",
"m4-32":"La fonction exponentielle est de classe C∞ et ses dérivées successives sont toutes égales à exp. En 0, f(0)=f'(0)=f''(0)=1. La formule de Taylor-Young à l'ordre 2 donne eˣ=1+x+x²/2+o(x²) lorsque x tend vers 0.",
"m4-35":"Dans R, le théorème de Heine-Borel affirme qu'une partie est compacte si et seulement si elle est fermée et bornée. Le segment [0,1] est borné et fermé (il contient ses deux extrémités). Il est donc compact.",
"m4-36":"La ligne de niveau de valeur 1 est l'ensemble des couples (x,y) tels que f(x,y)=1. Ici cela équivaut à x²+y²=1, équation du cercle de centre (0,0) et de rayon 1.",
"m4-37":"Considérons φ(x,y,z)=x−y+2z. C'est une forme linéaire non nulle, donc son rang vaut 1. L'ensemble H est son noyau. Par le théorème du rang, dim(H)=dim(R³)−rg(φ)=3−1=2.",
"m4-42":"On calcule uₙ−5/2=(5n−2)/(2n+3)−5/2=−19/[2(2n+3)]. Ainsi |uₙ−5/2|=19/[2(2n+3)]≤19/(4n). Soit ε>0. Choisissons N entier tel que N>19/(4ε). Pour tout n≥N, |uₙ−5/2|≤19/(4n)≤19/(4N)<ε. La définition de la convergence est vérifiée : uₙ→5/2.",
"m4-47":"Posons φ(x,y,z)=x+y+z. Cette forme linéaire est telle que F=ker(φ), donc F est un sous-espace. L'équation x+y+z=0 donne z=−x−y, d'où (x,y,z)=x(1,0,−1)+y(0,1,−1). La famille proposée engendre F. Elle est libre car λ(1,0,−1)+μ(0,1,−1)=0 impose λ=μ=0. C'est donc une base de F.",
"m4-50":"On normalise d'abord v₁=(1,1) : e₁=(1/√2,1/√2). La projection de v₂=(1,0) sur e₁ vaut ⟨v₂,e₁⟩e₁=(1/2,1/2). Le résidu est w₂=(1/2,−1/2), de norme 1/√2. Après normalisation, e₂=(1/√2,−1/√2). La famille (e₁,e₂) est orthonormée.",
"m4-52":"La matrice est triangulaire supérieure, donc ses valeurs propres sont 2 et 3. Pour λ=2, résoudre (A−2I)(x,y)=0 donne y=0 : E₂=Vect((1,0)). Pour λ=3, on obtient y=x : E₃=Vect((1,1)). Les deux vecteurs propres sont indépendants, donc forment une base. A est diagonalisable."
};
for(const [id,answer] of Object.entries(expandedAnswers)){const e=window.EXERCISES.find(x=>x.id===id);if(e)e.answer=answer;}
const secondHint={
limits:"Écris |uₙ−ℓ|, puis cherche un rang N qui rende cette quantité inférieure à ε.",
continuity:"Calcule la limite de f(x) quand x tend vers a, puis compare-la à f(a).",
derivative:"Identifie la règle de dérivation ou le théorème qui relie la dérivée à la propriété demandée.",
integrals:"Trouve une primitive sur l'intervalle, puis applique F(b)−F(a).",
series:"Commence par tester le terme général, puis choisis un critère adapté à la série.",
"vector-spaces":"Vérifie que le vecteur nul appartient à l'ensemble, puis teste la stabilité par combinaison linéaire.",
basis:"Traduis la liberté par une combinaison linéaire nulle et la génération par une décomposition quelconque.",
"linear-maps":"Applique la définition à deux vecteurs quelconques et deux scalaires arbitraires.",
matrices:"Écris la matrice ou le déterminant explicitement avant d'effectuer les calculs.",
eigenvalues:"Commence par résoudre det(A−λI)=0, puis calcule chaque sous-espace propre.",
trigonometry:"Place les angles sur le cercle trigonométrique et utilise les symétries et périodicités.",
taylor:"Écris le DL connu avec un ordre suffisant et conserve le premier terme non nul.",
compactness:"Vérifie séparément les propriétés de fermeture et de bornitude, ou applique le théorème adapté.",
multivariable:"Écris l'équation f(x,y)=c ou calcule les dérivées partielles en maintenant l'autre variable fixe.",
complex:"Sépare partie réelle et partie imaginaire, et remplace systématiquement i² par −1.",
polynomials:"Teste les valeurs candidates et utilise le théorème du facteur ou du reste.",
"linear-systems":"Choisis une inconnue à éliminer et effectue la même opération sur les deux membres.",
probability:"Définis précisément les événements et vérifie si la situation est équiprobable, conditionnelle ou indépendante.",
"differential-equations":"Reconnais la forme de l'équation, écris la solution générale, puis applique les conditions initiales.",
euclidean:"Calcule d'abord les produits scalaires et les normes ; vérifie ensuite l'orthogonalité."
};
const checkByTopic={
limits:"Vérifie que le rang choisi dépend bien de ε et que l'inégalité est vraie pour tout n≥N.",
continuity:"Vérifie que la limite existe et qu'elle est égale à la valeur de la fonction au point.",
derivative:"Vérifie le domaine de dérivabilité et justifie le théorème ou la règle utilisée.",
integrals:"Vérifie que la primitive est correcte et respecte l'ordre des bornes.",
series:"Ne confonds pas la condition nécessaire uₙ→0 avec un critère suffisant de convergence.",
"vector-spaces":"Vérifie le vecteur nul et la stabilité par combinaison linéaire.",
basis:"Vérifie séparément la liberté et le caractère générateur.",
"linear-maps":"Les deux scalaires et les deux vecteurs doivent être arbitraires.",
matrices:"Contrôle les signes et l'ordre des coefficients dans le déterminant.",
eigenvalues:"Vérifie que chaque vecteur propre est non nul et appartient bien au noyau A−λI.",
trigonometry:"Vérifie les solutions sur l'intervalle demandé et n'oublie pas la périodicité.",
taylor:"Vérifie que le reste est bien un petit o de l'ordre demandé.",
compactness:"Cite précisément le critère de compacité ou le théorème utilisé.",
multivariable:"Distingue bien les variables fixées et les variables qui varient.",
complex:"Vérifie séparément les parties réelle et imaginaire.",
polynomials:"Contrôle le degré, la multiplicité et le reste de division.",
"linear-systems":"Réinjecte la solution dans toutes les équations du système.",
probability:"Vérifie que les probabilités sont comprises entre 0 et 1 et que le conditionnement est défini.",
"differential-equations":"Dérive la solution obtenue et vérifie les conditions initiales.",
euclidean:"Vérifie le produit scalaire, la norme et l'orthogonalité utilisés."
};
// Keep preparatory topics in the dedicated advanced track.
const detailedSteps={"m4-62":["Une période T>0 vérifie cos(4(x+T))=cos(4x) pour tout x.","Cela revient à demander que 4T soit une période de cos, donc 4T=2kπ pour un entier k. Le plus petit T strictement positif correspond à k=1.","On obtient T=2π/4=π/2. Cette période est fondamentale car aucun T positif plus petit ne convient."],"m4-63":["Sur le cercle trigonométrique, le point M associé à l'angle x a pour coordonnées (cos x,sin x).","Le cercle est de centre O et de rayon 1, donc ses points vérifient X²+Y²=1.","En remplaçant X et Y par les coordonnées de M, on obtient cos²x+sin²x=1."],"m4-64":["On isole le cosinus : 2cos x−1=0 équivaut à cos x=1/2.","Sur le cercle unité, le cosinus est l'abscisse. La droite verticale d'équation X=1/2 coupe le cercle en deux points.","Sur [0,2π], les angles correspondants sont π/3 et 5π/3. Il n'y a pas d'autre solution sur cet intervalle."],"m4-65":["La fonction exponentielle est de classe C∞ et toutes ses dérivées sont égales à exp.","En particulier, f(0)=1, f'(0)=1 et f''(0)=1.","La formule de Taylor-Young à l'ordre 2 donne f(x)=f(0)+f'(0)x+f''(0)x²/2+o(x²).","Ainsi eˣ=1+x+x²/2+o(x²) lorsque x tend vers 0."],"m4-66":["On utilise le développement limité ln(1+x)=x−x²/2+o(x²) au voisinage de 0.","En soustrayant x, les termes d'ordre 1 s'annulent : ln(1+x)−x=−x²/2+o(x²).","Comme le coefficient −1/2 est non nul, le premier terme non nul fournit l'équivalent : ln(1+x)−x∼−x²/2."],"m4-67":["On part de l'identité géométrique finie (1−x)(1+x+x²+x³)=1−x⁴.","Pour x≠1, on divise par 1−x : 1/(1−x)=1+x+x²+x³+x⁴/(1−x).","Au voisinage de 0, 1/(1−x) est borné, donc x⁴/(1−x)=O(x⁴)=o(x³).","Le DL à l'ordre 3 est donc 1+x+x²+x³+o(x³)."],"m4-68":["Le théorème de Heine-Borel, dans ℝ, affirme qu'une partie est compacte si et seulement si elle est fermée et bornée.","Le segment [0,1] est borné puisqu'il est contenu dans [−1,2], par exemple.","Il est fermé dans ℝ car il contient ses deux extrémités et son complémentaire est ouvert.","Les deux conditions étant réunies, [0,1] est compact."],"m4-69":["Le critère de Heine-Borel dit qu'un compact de ℝ doit être fermé et borné.","Pour n≥2, la suite uₙ=1/n appartient à ]0,1[.","Or uₙ tend vers 0, et 0 n'appartient pas à ]0,1[. L'intervalle ne contient donc pas toutes les limites de ses suites convergentes : il n'est pas fermé.","Il n'est donc pas compact."],"m4-70":["On sait que K est compact et que f est continue sur K.","Le théorème de l'image continue d'un compact affirme alors que f(K) est compact dans ℝ.","Par Heine-Borel, f(K) est fermé et borné. Comme K est non vide, f(K) est non vide ; ses bornes sont atteintes.","Ainsi f est bornée sur K et atteint son minimum et son maximum."],"m4-71":["Pour z=a+ib, le conjugué est a−ib. Ici z=3−4i, donc son conjugué est 3+4i.","Le module vérifie |z|=√(a²+b²).","On calcule |z|=√(3²+(−4)²)=√(9+16)=√25=5."],"m4-72":["On développe par distributivité : (2+i)(3−2i)=6−4i+3i−2i².","On regroupe les termes : 6−i−2i².","Comme i²=−1, on a −2i²=2. Le résultat vaut donc 8−i."],"m4-73":["On écrit z²=−1 sous la forme z²+1=0.","On reconnaît une somme de deux carrés dans ℂ : z²+1=(z−i)(z+i).","Un produit est nul si et seulement si l'un de ses facteurs est nul.","Les deux solutions sont donc z=i et z=−i."],"m4-74":["On cherche deux nombres r et s tels que r+s=5 et rs=6.","Les couples de facteurs de 6 sont (1,6) et (2,3) à l'ordre près. Seul le couple (2,3) a pour somme 5.","On vérifie : (X−2)(X−3)=X²−5X+6. Donc P(X)=(X−2)(X−3)."],"m4-75":["Le polynôme est déjà écrit comme produit de facteurs irréductibles sur ℝ.","Le facteur (X−1) apparaît à la puissance 2 : 1 est donc une racine de multiplicité 2.","Le facteur (X+2)=(X−(−2)) apparaît à la puissance 1 : −2 est une racine simple.","Le degré total 2+1=3 correspond bien au degré du polynôme."],"m4-76":["Le théorème du reste indique que le reste de la division de P(X) par X−a est P(a).","Ici a=2. On calcule P(2)=2³−2×2+4=8−4+4.","Le reste vaut donc 8."],"m4-77":["On considère le système 2x+y=5 et x−y=1.","On additionne les deux équations membre à membre : 3x=6, donc x=2.","On remplace x par 2 dans x−y=1 : 2−y=1, d'où y=1.","Vérification : 2×2+1=5 et 2−1=1. La solution unique est (2,1)."],"m4-78":["La deuxième équation 2x−y=0 donne y=2x.","On substitue dans la première : x+2(2x)=5, donc 5x=5 et x=1.","Alors y=2x=2.","Vérification : 1+2×2=5 et 2×1−2=0. La solution est (1,2)."],"m4-79":["La première équation est x+y=1.","En multipliant cette égalité par 2, on devrait obtenir 2x+2y=2.","La deuxième équation impose pourtant 2x+2y=3. On aurait donc 2=3, contradiction.","Aucun couple (x,y) ne satisfait le système : il est incompatible."],"m4-80":["Les six issues possibles du dé équilibré sont 1,2,3,4,5,6 et elles sont équiprobables.","L'événement A « obtenir un nombre pair » est {2,4,6}. Il contient trois issues favorables.","La probabilité vaut donc card(A)/6=3/6=1/2."],"m4-81":["La probabilité conditionnelle de A sachant B est définie par P(A|B)=P(A∩B)/P(B), à condition que P(B)>0.","Ici P(B)=0,3 est strictement positif : la formule s'applique.","On calcule 0,12/0,3=0,4. Ainsi P(A|B)=0,4."],"m4-82":["Une variable de Bernoulli de paramètre p prend la valeur 1 avec probabilité p et 0 avec probabilité 1−p.","Son espérance vaut E(X)=1×p+0×(1−p)=p=0,3.","Comme X²=X, on a E(X²)=p. La variance vaut E(X²)−E(X)²=p−p²=p(1−p).","Donc V(X)=0,3×0,7=0,21."],"m4-83":["L'équation y'=3y est une équation différentielle linéaire homogène à coefficients constants.","La fonction y(x)=Ce^{3x} vérifie y'(x)=3Ce^{3x}=3y(x).","Réciproquement, en dérivant e^{-3x}y(x), on obtient e^{-3x}(y'−3y)=0 : ce produit est constant.","Toutes les solutions sur ℝ sont donc y(x)=Ce^{3x}, avec C réel."],"m4-84":["La solution générale de y'=3y est y(x)=Ce^{3x}.","La condition initiale y(0)=2 donne C e⁰=C=2.","La solution recherchée est donc y(x)=2e^{3x}. Elle vérifie bien y(0)=2 et y'=3y."],"m4-85":["L'équation y'=2x signifie que y est une primitive de la fonction x↦2x.","Une primitive de 2x est x², car (x²)'=2x.","Deux primitives sur l'intervalle ℝ diffèrent d'une constante. L'ensemble des solutions est donc y(x)=x²+C, C∈ℝ."],"m4-86":["Dans ℝ² muni du produit scalaire canonique, on multiplie les coordonnées de même rang puis on additionne.","Avec u=(1,2) et v=(3,−1), on obtient ⟨u,v⟩=1×3+2×(−1).","Ainsi ⟨u,v⟩=3−2=1."],"m4-87":["Le produit scalaire canonique de (a,b) et (c,d) vaut ac+bd.","On calcule ⟨u,v⟩=1×1+1×(−1)=0.","Par définition, deux vecteurs sont orthogonaux si et seulement si leur produit scalaire est nul. Donc u et v sont orthogonaux."],"m4-88":["La projection orthogonale de v sur la droite Vect(u), avec u non nul, est projᵤ(v)=(⟨v,u⟩/‖u‖²)u.","On calcule ⟨v,u⟩=2×1+1×1=3 et ‖u‖²=1²+1²=2.","Le coefficient vaut 3/2, donc projᵤ(v)=(3/2)(1,1)=(3/2,3/2).","Le résidu v−projᵤ(v)=(1/2,−1/2) est orthogonal à u, ce qui vérifie le résultat."],"m4-89":["On reconnaît une série géométrique de premier terme 1 et de raison q=1/3.","Une série géométrique Σqⁿ converge si et seulement si |q|<1. Ici |q|=1/3<1.","Sa somme à partir de n=0 vaut 1/(1−q)=1/(1−1/3)=3/2."],"m4-90":["On regroupe les termes par blocs dyadiques : pour chaque k≥0, considérons les indices de 2ᵏ+1 à 2ᵏ⁺¹.","Ce bloc contient 2ᵏ termes, chacun au moins égal à 1/2ᵏ⁺¹.","La somme du bloc est donc au moins 2ᵏ/2ᵏ⁺¹=1/2.","Après m blocs, la somme partielle est au moins 1+m/2. Elle n'est pas bornée : la série harmonique diverge."],"m4-91":["Si p≤0, le terme 1/nᵖ ne tend pas vers 0 ; la série diverge par condition nécessaire.","Supposons p>0. La fonction x↦x⁻ᵖ est positive et décroissante sur [1,+∞[ ; le critère intégral s'applique.","L'intégrale ∫₁ᴿ x⁻ᵖ dx tend vers une limite finie si et seulement si p>1 (pour p=1 elle vaut ln R ; pour p≠1 elle vaut (R^{1−p}−1)/(1−p)).","La série de Riemann converge donc exactement lorsque p>1."]};
for(const e of window.EXERCISES){if(detailedSteps[e.id])e.solutionSteps=detailedSteps[e.id];
 const h2=secondHint[e.topic];
 if(h2&&(!Array.isArray(e.hints)||e.hints.length<2))e.hints=[...(e.hints||[]),h2];
 if(checkByTopic[e.topic])e.check=checkByTopic[e.topic];
}

const courseEnrichment={
"limits":{methods:["Pour une limite de suite, isoler le terme dominant ou revenir à la définition ε-N lorsque le résultat l'exige.","Pour une suite définie par récurrence : établir un intervalle stable, étudier la monotonie, puis conclure par convergence monotone.","Pour une limite de quotient, vérifier d'abord que le dénominateur ne tend pas vers zéro."],errors:["Conclure à la convergence à partir de la seule monotonie sans établir une borne.","Passer à la limite dans une récurrence sans justifier la continuité de la fonction associée.","Confondre une suite bornée et une suite convergente."]},
"continuity":{methods:["Pour étudier la continuité en a, calculer la limite en a et la comparer à f(a).","Pour prouver une existence de zéro, vérifier continuité et changement de signe avant d'appliquer le théorème des valeurs intermédiaires.","Pour une fonction définie par morceaux, traiter séparément les points de raccord."],errors:["Appliquer le théorème des valeurs intermédiaires sans vérifier la continuité sur tout le segment.","Confondre existence d'une solution et unicité.","Oublier de comparer la limite à la valeur de la fonction."]},
"derivative":{methods:["Calculer le domaine de dérivabilité avant d'utiliser les règles de dérivation.","Construire un tableau de variations à partir du signe de f', puis traiter séparément les points critiques et les bornes.","Pour une inégalité, chercher une fonction auxiliaire et étudier ses variations ou appliquer le théorème des accroissements finis."],errors:["Confondre f'(a) et f(a).","Déduire le signe de f de celui de f'.","Utiliser le théorème des accroissements finis sans continuité sur le segment et dérivabilité à l'intérieur."]},
"integrals":{methods:["Chercher une primitive et vérifier en la dérivant avant d'évaluer aux bornes.","Pour une intégrale impropre, introduire une borne finie puis étudier une limite.","Pour une intégration par parties, identifier u et v' et écrire les quatre dérivées/primitives avant le calcul."],errors:["Oublier la soustraction F(b)-F(a).","Traiter une intégrale impropre comme une intégrale propre sans limite.","Confondre aire géométrique et intégrale signée."]},
"series":{methods:["Vérifier d'abord que le terme général tend vers zéro : c'est une condition nécessaire.","Comparer à une série de référence après avoir établi positivité et domination ou équivalence.","Pour une série alternée, vérifier décroissance du module et convergence vers zéro."],errors:["Croire que u_n→0 suffit à faire converger Σu_n.","Appliquer un critère de comparaison à des termes qui ne sont pas positifs.","Oublier de préciser le domaine de validité d'un équivalent."]},
"vector-spaces":{methods:["Pour prouver qu'un ensemble est un sous-espace, vérifier qu'il contient zéro et qu'il est stable par combinaison linéaire.","Pour un noyau, identifier explicitement l'application linéaire dont il est le noyau.","Pour montrer que deux sous-espaces sont supplémentaires, calculer leur intersection et leur somme ou comparer les dimensions."],errors:["Vérifier seulement la stabilité par addition et oublier la multiplication scalaire.","Confondre famille libre et famille génératrice.","Conclure à une somme directe sans vérifier l'intersection réduite à zéro."]},
"basis":{methods:["Pour prouver qu'une famille est une base en dimension n, utiliser n vecteurs libres ou n vecteurs générateurs.","Pour déterminer une dimension, paramétrer les solutions d'un système linéaire puis exhiber une base.","Pour Gram-Schmidt, soustraire toutes les projections précédentes avant de normaliser."],errors:["Normaliser avant d'avoir orthogonalisé.","Oublier de vérifier que les vecteurs de départ sont libres.","Confondre base orthogonale et base orthonormée."]},
"linear-maps":{methods:["Vérifier séparément l'additivité et l'homogénéité, ou directement la combinaison linéaire.","Calculer le noyau en résolvant f(x)=0 et l'image en décrivant les valeurs atteintes.","Utiliser le théorème du rang en précisant les dimensions finies."],errors:["Vérifier seulement f(0)=0 pour conclure à la linéarité.","Confondre noyau et image.","Appliquer le théorème du rang sans hypothèse de dimension finie."]},
"matrices":{methods:["Respecter les dimensions dans chaque produit matriciel : le nombre de colonnes de la première doit égaler le nombre de lignes de la seconde.","Pour l'inversibilité, utiliser le déterminant ou résoudre AX=Y selon la question.","Pour un déterminant 2×2, appliquer ad−bc en gardant l'ordre des termes."],errors:["Penser que le produit matriciel est commutatif.","Confondre matrice nulle et matrice non inversible sans préciser le cadre.","Développer un déterminant en oubliant les signes alternés."]},
"eigenvalues":{methods:["Calculer le polynôme caractéristique puis ses racines.","Pour chaque valeur propre λ, résoudre (A−λI)X=0 pour obtenir l'espace propre.","Comparer la somme des dimensions des espaces propres à la dimension totale."],errors:["Confondre multiplicité algébrique et dimension de l'espace propre.","Conclure qu'une matrice est diagonalisable parce que son polynôme caractéristique est scindé.","Oublier de vérifier l'indépendance des vecteurs propres choisis."]},
"term-sequences":{methods:["Identifier le type de suite : explicite, arithmétique, géométrique ou récurrente.","Pour une récurrence u_{n+1}=f(u_n), chercher un intervalle stable et le sens de variation.","Pour une suite géométrique, distinguer les cas selon la valeur absolue de la raison."],errors:["Confondre raison et premier terme.","Utiliser une formule explicite sans vérifier l'indice initial.","Déduire la convergence d'une simple représentation graphique."]},
"term-functions":{methods:["Déterminer le domaine, calculer la dérivée et dresser son tableau de signe.","Pour une tangente en a, utiliser y=f(a)+f'(a)(x−a).","Pour une optimisation, traduire d'abord le problème en fonction d'une variable et justifier l'intervalle."],errors:["Oublier les valeurs interdites dans le domaine.","Faire un tableau de variations sans étudier le signe de la dérivée.","Confondre extremum local et extremum global."]},
"term-probability":{methods:["Définir clairement l'univers et les événements avant de calculer.","Pour une loi binomiale, vérifier répétition d'épreuves indépendantes et probabilité de succès constante.","Pour une probabilité conditionnelle, identifier l'événement conditionnant et vérifier P(B)>0."],errors:["Confondre P(A∩B) et P(A|B).","Utiliser une loi binomiale sans vérifier ses hypothèses.","Oublier que les événements contraires ont des probabilités complémentaires."]},
"term-complex":{methods:["Passer en forme algébrique pour additionner et soustraire.","Passer en forme trigonométrique ou exponentielle pour multiplier, diviser et calculer des puissances.","Pour résoudre z²=a, vérifier les solutions par substitution."],errors:["Additionner les modules lors d'une somme complexe.","Oublier le signe de la partie imaginaire.","Confondre argument et module."]},
"term-vectors":{methods:["Traduire une relation géométrique par une égalité vectorielle.","Pour la colinéarité, comparer les coordonnées ou utiliser un déterminant adapté.","Pour le produit scalaire, choisir la formule la plus adaptée : coordonnées ou angle."],errors:["Confondre vecteur et point.","Inverser l'ordre dans un vecteur AB.","Conclure à l'orthogonalité à partir de coordonnées sans calculer le produit scalaire."]},
"term-equations":{methods:["Mettre l'équation sous forme ax²+bx+c=0 avec a non nul.","Calculer le discriminant puis traiter séparément Δ<0, Δ=0 et Δ>0 dans R.","Vérifier les solutions dans l'équation de départ lorsque des transformations non équivalentes sont utilisées."],errors:["Oublier le cas a=0.","Faire une erreur de signe dans b²−4ac.","Confondre racine double et deux racines distinctes."]},
"trigonometry":{methods:["Réduire les angles modulo 2π avant de lire le cercle trigonométrique.","Utiliser les symétries et identités pour transformer une expression.","Pour cos(ax+b), adapter période et décalage à partir de la variable x."],errors:["Confondre degrés et radians.","Donner 2π comme période de cos(ax) sans tenir compte de a.","Oublier les solutions périodiques d'une équation trigonométrique."]},
"taylor":{methods:["Préciser le point et l'ordre du développement limité avant de l'écrire.","Conserver le reste de Peano o(xⁿ) à l'ordre n.","Pour un équivalent, factoriser le premier terme non nul et vérifier son coefficient."],errors:["Oublier le terme de reste.","Composer ou multiplier des DL à un ordre incompatible.","Remplacer un équivalent dans une somme sans justification."]},
"compactness":{methods:["Dans Rⁿ, reconnaître les compacts comme les ensembles fermés et bornés.","Pour une fonction continue sur un compact, utiliser l'existence des extrema et l'image compacte.","Pour une suite dans un compact métrique, extraire une sous-suite convergente."],errors:["Étendre Heine-Borel à tout espace métrique.","Confondre borné et compact.","Oublier que la continuité doit être définie sur le compact."]},
"multivariable":{methods:["Calculer les dérivées partielles en gardant l'autre variable constante.","Pour un point critique, résoudre le système ∇f=0 puis étudier la nature avec la Hessienne si le critère s'applique.","Décrire les lignes de niveau en fixant f(x,y)=c."],errors:["Confondre dérivées partielles et différentiabilité.","Conclure à un extremum à partir de ∇f=0 seulement.","Oublier de préciser le domaine de la fonction."]},
"complex":{methods:["Identifier partie réelle et partie imaginaire dans une égalité.","Utiliser le conjugué pour rationaliser un quotient.","Résoudre une équation complexe en identifiant les deux composantes réelles."],errors:["Oublier que deux complexes sont égaux si et seulement si leurs parties réelles et imaginaires coïncident.","Utiliser i²=1 au lieu de i²=−1.","Confondre module et carré du module."]},
"polynomials":{methods:["Effectuer la division euclidienne par un polynôme non nul.","Utiliser le théorème de factorisation : P(a)=0 équivaut à (X−a) divisant P.","Comparer degrés et coefficients pour établir une identité polynomiale."],errors:["Confondre racine et coefficient.","Diviser par un polynôme sans vérifier qu'il est non nul.","Oublier que deux polynômes égaux ont tous leurs coefficients égaux."]},
"linear-systems":{methods:["Écrire la matrice augmentée et appliquer des opérations élémentaires sur les lignes.","Repérer les pivots pour déterminer rang, compatibilité et variables libres.","Paramétrer l'ensemble des solutions lorsqu'il existe des variables libres."],errors:["Effectuer une opération sur une ligne sans l'appliquer à tous ses coefficients.","Diviser par un pivot nul.","Confondre existence et unicité des solutions."]},
"probability":{methods:["Construire un arbre pondéré pour des expériences successives.","Utiliser la formule des probabilités totales sur une partition de l'univers.","Pour l'indépendance, vérifier P(A∩B)=P(A)P(B), pas seulement une intuition."],errors:["Additionner des probabilités d'événements non disjoints.","Confondre indépendance et incompatibilité.","Oublier de conditionner les branches d'un arbre."]},
"differential-equations":{methods:["Identifier l'ordre et le type de l'équation avant de choisir une méthode.","Pour y'=ay, reconnaître la famille Ce^{ax}.","Appliquer la condition initiale après avoir déterminé la solution générale."],errors:["Oublier la constante d'intégration.","Donner une solution particulière comme solution générale.","Ne pas vérifier la solution en la substituant dans l'équation."]},
"euclidean":{methods:["Vérifier les axiomes du produit scalaire ou utiliser celui déjà défini.","Pour projeter sur une droite engendrée par u non nul, utiliser (<v,u>/||u||²)u.","Pour une famille orthogonale de vecteurs non nuls, conclure à la liberté puis normaliser si nécessaire."],errors:["Projeter sur le vecteur nul.","Confondre orthogonalité et orthonormalité.","Oublier que la norme est la racine carrée de <x,x>."]}
};
for(const t of window.TOPICS){const extra=courseEnrichment[t.id];if(extra){t.methods=extra.methods;t.commonErrors=extra.errors;}}
const additionalTheorems={
"trigonometry":[{title:"Période fondamentale de cos(ax)",statement:"Pour a≠0, la fonction x↦cos(ax) a pour période fondamentale 2π/|a|.",proof:"Une période T>0 doit vérifier cos(a(x+T))=cos(ax) pour tout x. La période fondamentale de cos est 2π ; la plus petite valeur positive de |a|T qui soit une période est 2π. Ainsi T=2π/|a|."}],
"taylor":[{title:"Formule de Taylor-Young à l'ordre 2",statement:"Si f est deux fois dérivable au voisinage de 0 et si f'' est continue en 0, alors f(x)=f(0)+f'(0)x+f''(0)x²/2+o(x²) lorsque x→0.",proof:"La formule de Taylor avec reste de Peano donne f(x)=Σ_{k=0}² f^{(k)}(0)x^k/k!+o(x²). En écrivant les trois termes, on obtient l'égalité annoncée. Les hypothèses garantissent l'existence des dérivées utilisées."}],
"compactness":[{title:"Un fermé d'un compact est compact",statement:"Si K est compact et F est un fermé de K pour la topologie induite, alors F est compact.",proof:"Soit (Uᵢ)ᵢ∈I un recouvrement ouvert de F par des ouverts de K. Comme F est fermé dans K, K\\F est ouvert dans K. La famille formée des Uᵢ et de K\\F recouvre K. Par compacité de K, un nombre fini de ces ouverts suffit à recouvrir K. En retirant éventuellement K\\F, les ouverts Uᵢ retenus recouvrent encore F. On a donc extrait un sous-recouvrement fini de tout recouvrement ouvert de F : F est compact."}],
"multivariable":[{title:"Condition nécessaire d'extremum local",statement:"Si f est différentiable sur un ouvert de Rⁿ et possède un extremum local en un point intérieur a, alors ∇f(a)=0.",proof:"Pour chaque vecteur h, considérons la fonction d'une variable φ(t)=f(a+th), définie pour t proche de 0. Elle possède un extremum local en 0, donc φ'(0)=0. Par la règle de dérivation, φ'(0)=df(a)(h)=⟨∇f(a),h⟩. Cette égalité vaut pour tout h ; en prenant h=∇f(a), on obtient ||∇f(a)||²=0, donc ∇f(a)=0."}],
"complex":[{title:"Module d'un produit",statement:"Pour tous z,w∈C, |zw|=|z||w|.",proof:"On part de l’identité \\[|u|^2=u\\overline{u}.\\]\n\nEn l’appliquant au produit \\(zw\\), on obtient :\n\\[\\begin{aligned}|zw|^2&=(zw)\\overline{(zw)}\\\\&=zw\\,\\bar z\\,\\bar w\\\\&=(z\\bar z)(w\\bar w)\\\\&=|z|^2|w|^2.\\end{aligned}\\]\n\nOr les modules sont positifs ou nuls. En prenant la racine carrée des deux membres, il vient finalement :\n\\[\\boxed{|zw|=|z|\\,|w|}.\\]"}],
"polynomials":[{title:"Théorème de factorisation",statement:"Pour P∈K[X] et a∈K, P(a)=0 si et seulement si X−a divise P.",proof:"La division euclidienne donne P(X)=(X−a)Q(X)+r, où r est constant. En évaluant en a, P(a)=r. Ainsi P(a)=0 équivaut à r=0, c'est-à-dire à la divisibilité par X−a."}],
"linear-systems":[{title:"Critère de compatibilité de Rouché-Capelli",statement:"Le système AX=b est compatible si et seulement si rg(A)=rg(A|b). Lorsqu'il est compatible, l'ensemble des solutions est de dimension n−rg(A) dans le cas d'un système à n inconnues.",proof:"Les solutions existent exactement lorsque b appartient à l'image de l'application linéaire x↦Ax. Cela équivaut à ce que l'ajout de b comme colonne ne fasse pas augmenter le rang : rg(A)=rg(A|b). Si x₀ est une solution, l'ensemble des solutions est x₀+ker(A). Le théorème du rang donne dim ker(A)=n−rg(A)."}],
"probability":[{title:"Formule des probabilités totales",statement:"Si (B₁,…,Bₙ) est une partition de l'univers avec P(Bᵢ)>0, alors P(A)=Σᵢ P(A|Bᵢ)P(Bᵢ).",proof:"Les événements A∩Bᵢ sont deux à deux disjoints et leur union est A. Par additivité, P(A)=ΣᵢP(A∩Bᵢ). Par définition de la probabilité conditionnelle, P(A∩Bᵢ)=P(A|Bᵢ)P(Bᵢ). En sommant, on obtient la formule."}],
"differential-equations":[{title:"Solutions de y'=ay",statement:"Sur un intervalle I, les solutions de y'=ay, avec a réel constant, sont exactement y(x)=Ce^{ax}, où C∈R.",proof:"Si y(x)=Ce^{ax}, alors y'=aCe^{ax}=ay. Réciproquement, si y'=ay, la fonction g(x)=e^{-ax}y(x) vérifie g'=e^{-ax}(y'−ay)=0. Elle est donc constante sur I, d'où y(x)=Ce^{ax}."}],
"euclidean":[{title:"Projection orthogonale sur une droite",statement:"Si u≠0, la projection orthogonale de v sur Vect(u) est projᵤ(v)=(⟨v,u⟩/||u||²)u.",proof:"Écrivons p=tu. La condition de projection orthogonale impose v−p ⟂ u, donc ⟨v−tu,u⟩=0. Ainsi ⟨v,u⟩−t||u||²=0. Comme u≠0, ||u||²>0 et t=⟨v,u⟩/||u||². On obtient la formule."}],
"term-sequences":[{title:"Convergence d'une suite monotone bornée",statement:"Toute suite réelle croissante et majorée converge ; toute suite réelle décroissante et minorée converge.",proof:"Dans le cas croissant et majoré, l'ensemble des termes possède une borne supérieure ℓ. Pour tout ε>0, ℓ−ε n'est pas un majorant : il existe N tel que u_N>ℓ−ε. Pour n≥N, la croissance donne ℓ−ε<u_N≤u_n≤ℓ. Donc u_n→ℓ. Le cas décroissant et minoré se démontre de façon analogue avec l'infimum."}],
"term-functions":[{title:"Théorème des accroissements finis",statement:"Si f est continue sur [a,b] et dérivable sur ]a,b[, il existe c∈]a,b[ tel que f(b)−f(a)=f'(c)(b−a).",proof:"On considère la fonction auxiliaire g(x)=f(x)−f(a)−(f(b)−f(a))(x−a)/(b−a). Elle est continue sur [a,b], dérivable sur ]a,b[ et vérifie g(a)=g(b)=0. Le théorème de Rolle fournit c∈]a,b[ tel que g'(c)=0, ce qui donne l'égalité."}],
"term-probability":[{title:"Espérance et variance d'une loi binomiale",statement:"Si X suit une loi binomiale B(n,p), alors E(X)=np et Var(X)=np(1−p).",proof:"Écrivons X comme somme de n variables de Bernoulli indépendantes de paramètre p. Par linéarité de l'espérance, E(X)=np. Par indépendance, les variances s'additionnent ; chaque variable de Bernoulli a pour variance p(1−p). Donc Var(X)=np(1−p)."}],
"term-complex":[{title:"Formule de Moivre",statement:"Pour tout réel θ et tout entier n, (cos θ+i sin θ)ⁿ=cos(nθ)+i sin(nθ).",proof:"Pour n≥0, le résultat se démontre par récurrence en utilisant la formule d'addition du sinus et du cosinus. Le cas n=0 est immédiat ; si la formule est vraie au rang n, la multiplication par cos θ+i sin θ donne celle au rang n+1. Pour n<0, on utilise l'inverse du nombre complexe de module 1."}],
"term-vectors":[{title:"Relation de Chasles",statement:"Pour tous points A,B,C d'un espace affine, AB⃗+BC⃗=AC⃗.",proof:"En choisissant une origine O, on a AB⃗=OB⃗−OA⃗ et BC⃗=OC⃗−OB⃗. En additionnant, les termes OB⃗ s'annulent et il reste OC⃗−OA⃗=AC⃗."}],
"term-equations":[{title:"Discriminant d'un trinôme",statement:"Pour ax²+bx+c=0 avec a≠0, poser Δ=b²−4ac. Si Δ>0, les racines sont (−b±√Δ)/(2a) ; si Δ=0, la racine double est −b/(2a) ; si Δ<0, il n'y a pas de racine réelle.",proof:"On divise l'équation par a puis on complète le carré : (x+b/(2a))²=Δ/(4a²). Le signe de Δ détermine l'existence de solutions réelles et la formule découle en prenant les racines carrées."}]
};
for(const t of window.TOPICS){if(additionalTheorems[t.id]&&!t.theorems?.length)t.theorems=additionalTheorems[t.id];}
for(const [id,steps] of Object.entries({
"term-ex-3":["On dérive terme à terme le polynôme : (2x³)'=6x², (−3x²)'=−6x, (4x)'=4 et (−1)'=0.","On additionne les dérivées obtenues : f'(x)=6x²−6x+4.","On peut vérifier que la dérivée est encore un polynôme défini sur tout R."],
"term-ex-7":["On regroupe les parties réelles : 2+1=3.","On regroupe les parties imaginaires : 3i−5i=−2i.","On obtient la forme algébrique 3−2i. La vérification consiste à retrouver séparément la partie réelle 3 et la partie imaginaire −2."]})){
 const e=byId[id];if(e){e.solutionSteps=steps;e.answer=id==="term-ex-3"?"La dérivée est $\\boxed{f'(x)=6x^2-6x+4}$.":"La somme s'écrit $\\boxed{3-2i}$.";e.hints=[...(e.hints||[]),id==="term-ex-3"?"Dérive séparément chacun des quatre termes du polynôme.":"Additionne séparément les parties réelles et les parties imaginaires."];}
}


for(const e of window.EXERCISES){
 if(!Array.isArray(e.solutionSteps)||!e.solutionSteps.length){
  const raw=String(e.answer||"").trim();
  if(raw){
   let blocks=raw.split(/\n\s*\n|(?=\*\*\d+\.\s)/).map(x=>x.trim()).filter(Boolean);
   blocks=blocks.flatMap(block=>{
    if(/^\*\*\d+\.\s/.test(block))return [block];
    const sentences=block.split(/(?<=[.!?])\s+(?=(?:[A-ZÀ-ÖØ-Þ$\\]))/).map(x=>x.trim()).filter(Boolean);
    return sentences.length>1?sentences:[block];
   });
   e.solutionSteps=blocks.length?blocks:[raw];
  }
 }
 const t=window.TOPICS.find(x=>x.id===e.topic);
 if((!Array.isArray(e.hints)||e.hints.length<2)&&t?.methods?.length){
  e.hints=[...(e.hints||[]),"Méthode à mobiliser : "+t.methods[0]];
 }
}


// The multivariable chapter and its exercises belong to the L2 track.
if(byId["m4-36"])byId["m4-36"].level="L2";
})();
from manim import *
config.background_color = "#07111F"

class DiagonalizationJourney(Scene):
    """Slow guided explanation of eigenvectors, characteristic polynomial and change of basis."""
    def construct(self):
        title = Text("Comprendre la diagonalisation", font_size=38, color=WHITE)
        subtitle = Text("Une même transformation, deux écritures", font_size=22, color="#9AABC5")
        VGroup(title, subtitle).arrange(DOWN, buff=0.22).to_edge(UP, buff=0.38)
        self.play(FadeIn(title, shift=DOWN*0.2), FadeIn(subtitle), run_time=2)
        self.wait(1.5)
        plane = NumberPlane(x_range=[-3,4,1], y_range=[-2,4,1], x_length=7.2, y_length=5.2,
            background_line_style={"stroke_color":"#30415E","stroke_width":1,"stroke_opacity":0.75},
            axis_config={"stroke_color":"#8295B5","stroke_width":2}).shift(LEFT*2.6+DOWN*.45)
        o=plane.c2p(0,0)
        v1=Arrow(o,plane.c2p(1.2,0),buff=0,color="#59C7F2",stroke_width=6)
        v2=Arrow(o,plane.c2p(-1,1),buff=0,color="#A99BFF",stroke_width=6)
        x=Arrow(o,plane.c2p(1,1),buff=0,color="#F4B95F",stroke_width=6)
        matrix=MathTex(r"A=\begin{pmatrix}2&1\\0&1\end{pmatrix}").scale(.9).to_corner(UR).shift(DOWN*1)
        self.play(Create(plane),run_time=2.5)
        self.play(GrowArrow(v1),GrowArrow(v2),GrowArrow(x),Write(matrix),run_time=2.5)
        self.wait(2)
        iv1=Arrow(o,plane.c2p(2.4,0),buff=0,color="#59C7F2",stroke_width=7)
        iv2=Arrow(o,plane.c2p(-1,1),buff=0,color="#A99BFF",stroke_width=7)
        note=MathTex(r"Av_1=2v_1",r"\qquad",r"Av_2=v_2").scale(.95).to_edge(DOWN)
        note[0].set_color("#59C7F2");note[2].set_color("#A99BFF")
        self.play(Transform(v1,iv1),Transform(v2,iv2),run_time=3)
        self.play(Write(note),run_time=2);self.wait(2)
        self.play(FadeOut(plane),FadeOut(v1),FadeOut(v2),FadeOut(x),FadeOut(matrix),FadeOut(note),run_time=1.5)
        heading=Text("Étape 1 · le polynôme caractéristique",font_size=28).to_edge(UP,buff=0.42)
        caption=Text("Les valeurs propres sont les racines de ce polynôme.",font_size=19,color="#9AABC5").next_to(heading,DOWN,buff=0.35)
        self.play(FadeIn(heading),FadeIn(caption),run_time=1.2)

        # Une seule ligne de calcul est visible à la fois : aucune formule ne peut se chevaucher.
        poly1=MathTex(r"\chi_A(\lambda)=\det(A-\lambda I)").scale_to_fit_width(11.8).move_to(ORIGIN)
        self.play(Write(poly1),run_time=2.2)
        self.wait(1.1)

        poly2=MathTex(r"\chi_A(\lambda)=\det\begin{pmatrix}2-\lambda&1\\0&1-\lambda\end{pmatrix}").scale_to_fit_width(11.8).move_to(ORIGIN)
        self.play(FadeOut(poly1,shift=UP*.12),FadeIn(poly2,shift=DOWN*.12),run_time=1.1)
        self.wait(1.2)

        poly3=MathTex(r"\chi_A(\lambda)=(2-\lambda)(1-\lambda)").scale_to_fit_width(11.8).move_to(ORIGIN)
        poly3.set_color("#65D6B0")
        note=Text("La matrice est triangulaire : son déterminant est le produit des termes diagonaux.",font_size=18,color="#B9C8DC").to_edge(DOWN,buff=0.65)
        self.play(FadeOut(poly2,shift=UP*.12),FadeIn(poly3,shift=DOWN*.12),run_time=1.1)
        self.play(FadeIn(note),run_time=.8)
        self.wait(1.8)
        self.play(FadeOut(poly3),FadeOut(note),FadeOut(caption),run_time=1)

        roots=MathTex(r"\lambda_1=2",r"\qquad",r"\lambda_2=1").scale_to_fit_width(9.5).move_to(ORIGIN)
        roots[0].set_color("#59C7F2");roots[2].set_color("#A99BFF")
        root_note=Text("Les deux racines sont les deux valeurs propres.",font_size=19,color="#B9C8DC").next_to(roots,DOWN,buff=.65)
        self.play(Write(roots),FadeIn(root_note),run_time=2)
        self.wait(2)
        heading2=Text("Étape 2 · construire la base propre",font_size=28).to_edge(UP)
        basis=MathTex(r"v_1=\begin{pmatrix}1\\0\end{pmatrix}",r"\qquad",r"v_2=\begin{pmatrix}-1\\1\end{pmatrix}").scale(1).move_to(UP*.65)
        basis[0].set_color("#59C7F2");basis[2].set_color("#A99BFF")
        P=MathTex(r"P=(v_1\ v_2)=\begin{pmatrix}1&-1\\0&1\end{pmatrix}").scale(.95).next_to(basis,DOWN,buff=.8)
        D=MathTex(r"D=\begin{pmatrix}2&0\\0&1\end{pmatrix}").scale(1.05).next_to(P,DOWN,buff=.6)
        self.play(FadeOut(roots),FadeOut(root_note),Transform(heading,heading2),run_time=1.5)
        self.play(Write(basis),run_time=2.5);self.wait(1)
        self.play(Write(P),run_time=2);self.play(Write(D),run_time=2);self.wait(2)
        relation=MathTex(r"\boxed{D=P^{-1}AP}",r"\qquad\Longleftrightarrow\qquad",r"\boxed{A=PDP^{-1}}").scale(.9).to_edge(DOWN,buff=.55)
        relation[0].set_color("#65D6B0");relation[2].set_color("#F4B95F")
        self.play(Write(relation),run_time=3);self.wait(2)
        final=VGroup(Text("À retenir",font_size=32,color="#65D6B0"),MathTex(r"\text{Même application linéaire}"),MathTex(r"\text{Deux bases différentes}"),MathTex(r"\text{Deux matrices semblables}"),MathTex(r"\text{Dans la base propre : une matrice diagonale}")).arrange(DOWN,buff=.42).move_to(ORIGIN)
        self.play(FadeOut(basis),FadeOut(P),FadeOut(D),FadeOut(relation),FadeOut(heading),FadeIn(final),run_time=2.5)
        self.wait(4)

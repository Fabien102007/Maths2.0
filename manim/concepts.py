from manim import *
import numpy as np

config.background_color = "#07111F"


class DerivativeTangent(MovingCameraScene):
    """A secant rotates into the tangent as h tends to zero."""

    def construct(self):
        axes = Axes(
            x_range=[-0.5, 3.3, 0.5], y_range=[-0.5, 9.5, 1],
            x_length=10.8, y_length=6.2,
            axis_config={"color": "#7186A6", "stroke_width": 2},
            tips=True,
        ).shift(DOWN * 0.25)
        labels = axes.get_axis_labels(MathTex("x"), MathTex("y"))
        graph = axes.plot(lambda x: x**2, x_range=[-0.15, 3.05], color="#59C7F2", stroke_width=7)
        curve_label = MathTex("f(x)=x^2", color="#59C7F2").scale(0.85).to_corner(UR).shift(DOWN*0.65+LEFT*0.25)
        a = 1.35
        h = ValueTracker(1.45)
        p = axes.c2p(a, a*a)
        q = always_redraw(lambda: Dot(axes.c2p(a+h.get_value(), (a+h.get_value())**2), color="#F4B95F", radius=0.09))
        p_dot = Dot(p, color="#F4B95F", radius=0.095)
        secant = always_redraw(lambda: Line(
            axes.c2p(a-0.7, a*a-(2*a+h.get_value())*0.7),
            axes.c2p(a+h.get_value()+0.7, a*a+(2*a+h.get_value())*(h.get_value()+0.7)),
            color="#F4B95F", stroke_width=5
        ))
        tangent = axes.plot(lambda x: 2*a*x-a*a, x_range=[0.0, 3.1], color="#65D6B0", stroke_width=5)
        formula = MathTex(
            r"\frac{f(a+h)-f(a)}{h}", "=", r"\frac{(a+h)^2-a^2}{h}", "=", "2a+h"
        ).scale(0.8).to_edge(UP, buff=0.32)
        derivative = MathTex(r"f'(a)=2a", color="#65D6B0").scale(1.0).to_corner(DR).shift(UP*0.55+LEFT*0.25)

        self.play(Create(axes), FadeIn(labels), Create(graph), FadeIn(curve_label), run_time=2)
        self.play(Write(formula), FadeIn(p_dot), FadeIn(q), Create(secant), run_time=1.5)
        self.wait(0.4)
        self.play(h.animate.set_value(0.06), run_time=5, rate_func=smooth)
        self.play(Create(tangent), FadeIn(derivative), run_time=1.8)
        self.wait(1.5)
        self.play(h.animate.set_value(0.015), run_time=2, rate_func=smooth)
        self.wait(2)


class FourierSquareWave(Scene):
    """Build a square wave from its odd sine harmonics."""

    def construct(self):
        axes = Axes(
            x_range=[-PI, PI, PI/2], y_range=[-1.7, 1.7, 0.5],
            x_length=11.5, y_length=5.5,
            axis_config={"color": "#7186A6", "stroke_width": 2},
            tips=False,
        ).shift(DOWN*0.3)
        axes_labels = VGroup(
            MathTex("-\\pi").scale(0.65).next_to(axes.c2p(-PI,0), DOWN),
            MathTex("0").scale(0.65).next_to(axes.c2p(0,0), DOWN),
            MathTex("\\pi").scale(0.65).next_to(axes.c2p(PI,0), DOWN),
        )
        title = MathTex(
            r"S_N(x)=\frac{4}{\pi}\sum_{k=0}^{N-1}\frac{\sin((2k+1)x)}{2k+1}"
        ).scale(0.82).to_edge(UP, buff=0.35)
        n_tracker = ValueTracker(1)
        def partial(x):
            n = max(1, int(round(n_tracker.get_value())))
            return (4/PI)*sum(np.sin((2*k+1)*x)/(2*k+1) for k in range(n))
        wave = always_redraw(lambda: axes.plot(
            partial, x_range=[-PI, PI], color="#59C7F2", stroke_width=6,
            use_smoothing=False
        ))
        n_label = always_redraw(lambda: MathTex(
            r"N=", str(max(1,int(round(n_tracker.get_value())))), color="#F4B95F"
        ).scale(0.9).to_corner(UR).shift(DOWN*0.65+LEFT*0.3))
        target = axes.plot(
            lambda x: 1 if x > 0 else (-1 if x < 0 else 0),
            x_range=[-PI, PI], color="#7186A6", stroke_width=3
        )
        self.play(Create(axes), FadeIn(axes_labels), Write(title), run_time=2)
        self.play(Create(target), Create(wave), FadeIn(n_label), run_time=1.5)
        self.wait(0.7)
        self.play(n_tracker.animate.set_value(3), run_time=3, rate_func=linear)
        self.play(n_tracker.animate.set_value(7), run_time=4, rate_func=linear)
        self.play(n_tracker.animate.set_value(15), run_time=5, rate_func=linear)
        self.wait(2)


class RiemannIntegral(Scene):
    """Upper rectangles refine toward the exact area under x squared."""

    def construct(self):
        axes = Axes(
            x_range=[0, 3.2, 0.5], y_range=[0, 9.5, 1],
            x_length=10.5, y_length=6.0,
            axis_config={"color": "#7186A6", "stroke_width": 2},
            tips=True,
        ).shift(DOWN*0.25+LEFT*0.1)
        labels = axes.get_axis_labels(MathTex("x"), MathTex("y"))
        curve = axes.plot(lambda x:x**2, x_range=[0,3], color="#59C7F2", stroke_width=7)
        area = axes.get_area(curve, x_range=[0,2.7], color="#59C7F2", opacity=0.18)
        formula = MathTex(r"\int_0^b x^2\,dx=\frac{b^3}{3}").scale(0.95).to_edge(UP, buff=0.35)
        b = 2.7
        exact = MathTex(r"A(b)=\frac{b^3}{3}", color="#65D6B0").scale(0.9).to_corner(DR).shift(UP*0.45+LEFT*0.3)
        def rectangles(n):
            dx=b/n
            bars=VGroup()
            for k in range(n):
                x0=k*dx
                height=(x0+dx)**2
                bars.add(Polygon(
                    axes.c2p(x0,0), axes.c2p(x0+dx,0),
                    axes.c2p(x0+dx,height), axes.c2p(x0,height),
                    stroke_color="#F4B95F", stroke_width=1.3,
                    fill_color="#F4B95F", fill_opacity=0.26
                ))
            return bars
        current=rectangles(4)
        self.play(Create(axes), FadeIn(labels), Write(formula), run_time=2)
        self.play(Create(curve), FadeIn(area), FadeIn(current), run_time=2)
        self.wait(0.8)
        for n in [8, 16, 32, 64]:
            refined=rectangles(n)
            self.play(ReplacementTransform(current, refined), run_time=1.4, rate_func=smooth)
            current=refined
        self.play(FadeIn(exact), run_time=1)
        self.wait(2)


class EpsilonNConvergence(Scene):
    """Show the epsilon band, the threshold N, and the entire tail of the sequence."""

    def construct(self):
        axes = Axes(
            x_range=[0, 25, 5],
            y_range=[0.75, 2.1, 0.25],
            x_length=10.8,
            y_length=5.2,
            axis_config={"color": "#7186A6", "stroke_width": 2},
            tips=True,
        ).shift(DOWN * 0.35 + LEFT * 0.15)
        x_label = MathTex("n", color="#91A8C0").scale(0.75).next_to(axes.x_axis.get_end(), RIGHT)
        y_label = MathTex("u_n", color="#91A8C0").scale(0.75).next_to(axes.y_axis.get_end(), UP)
        title = MathTex(r"u_n=1+\frac{1}{n}\quad\longrightarrow\quad 1").scale(0.9).to_edge(UP, buff=0.28)

        limit = 1.0
        epsilon = 0.1
        N = 11
        upper = axes.plot(lambda n: limit + epsilon, x_range=[0, 25], color="#65D6B0", stroke_width=2)
        lower = axes.plot(lambda n: limit - epsilon, x_range=[0, 25], color="#65D6B0", stroke_width=2)
        limit_line = axes.plot(lambda n: limit, x_range=[0, 25], color="#59C7F2", stroke_width=3)
        band = Polygon(
            axes.c2p(0, 0.9), axes.c2p(25, 0.9),
            axes.c2p(25, 1.1), axes.c2p(0, 1.1),
            stroke_width=0, fill_color="#65D6B0", fill_opacity=0.13,
        )
        upper_label = MathTex(r"L+\varepsilon", color="#65D6B0").scale(0.55).next_to(axes.c2p(0, 1.1), LEFT, buff=0.12)
        lower_label = MathTex(r"L-\varepsilon", color="#65D6B0").scale(0.55).next_to(axes.c2p(0, 0.9), LEFT, buff=0.12)
        limit_label = MathTex(r"L=1", color="#59C7F2").scale(0.62).next_to(axes.c2p(25, 1), RIGHT, buff=0.12)

        early_points = VGroup(*[
            Dot(axes.c2p(n, 1 + 1 / n), color="#F4B95F", radius=0.075)
            for n in range(1, N)
        ])
        tail_points = VGroup(*[
            Dot(axes.c2p(n, 1 + 1 / n), color="#65D6B0", radius=0.065)
            for n in range(N, 25)
        ])
        threshold = DashedLine(
            axes.c2p(N, 0.78), axes.c2p(N, 1.72),
            color="#F4B95F", dash_length=0.12, stroke_width=3,
        )
        n_label = MathTex(r"N=11", color="#F4B95F").scale(0.72).next_to(axes.c2p(N, 0.78), DOWN, buff=0.15)
        formula = MathTex(
            r"|u_n-L|=\frac{1}{n}<\varepsilon=0.1",
            r"\iff n>10",
            r"\iff n\geq 11",
        ).scale(0.68).to_edge(DOWN, buff=0.22)
        quantifier = MathTex(
            r"\forall n\geq N,\quad |u_n-L|<\varepsilon",
            color="#65D6B0",
        ).scale(0.78).to_corner(UR).shift(DOWN * 0.82 + LEFT * 0.25)

        self.play(Write(title), Create(axes), FadeIn(x_label), FadeIn(y_label), run_time=1.8)
        self.play(FadeIn(band), Create(upper), Create(lower), Create(limit_line), run_time=1.6)
        self.play(FadeIn(upper_label), FadeIn(lower_label), FadeIn(limit_label), run_time=0.8)
        self.play(LaggedStart(*[FadeIn(p, scale=0.7) for p in early_points], lag_ratio=0.12), run_time=2.2)
        self.wait(0.5)
        self.play(Create(threshold), FadeIn(n_label), run_time=1)
        self.play(LaggedStart(*[FadeIn(p, scale=0.7) for p in tail_points], lag_ratio=0.08), run_time=2)
        self.play(Write(formula), run_time=1.6)
        self.play(Write(quantifier), run_time=1.4)
        self.wait(2)


class GramSchmidtGeometry(Scene):
    """Construct an orthonormal pair by projection, subtraction, and normalization."""

    def construct(self):
        axes = Axes(
            x_range=[-0.2, 2.8, 1],
            y_range=[-0.2, 2.8, 1],
            x_length=5.7,
            y_length=5.7,
            axis_config={"color": "#7186A6", "stroke_width": 2},
            tips=True,
        ).shift(LEFT * 3.0 + DOWN * 0.25)
        origin = axes.c2p(0, 0)
        v1_end = axes.c2p(2, 0)
        v2_end = axes.c2p(1, 2)
        proj_end = axes.c2p(1, 0)
        residual_end = axes.c2p(0, 2)

        title = MathTex(r"\text{Gram--Schmidt}", color=WHITE).scale(0.88).to_edge(UP, buff=0.28)
        v1 = Arrow(origin, v1_end, buff=0, color="#59C7F2", stroke_width=7, max_tip_length_to_length_ratio=0.14)
        v2 = Arrow(origin, v2_end, buff=0, color="#F4B95F", stroke_width=7, max_tip_length_to_length_ratio=0.14)
        projection = Arrow(origin, proj_end, buff=0, color="#A99BFF", stroke_width=7, max_tip_length_to_length_ratio=0.16)
        residual = Arrow(proj_end, v2_end, buff=0, color="#65D6B0", stroke_width=7, max_tip_length_to_length_ratio=0.16)
        guide = DashedLine(v2_end, proj_end, color="#65D6B0", stroke_width=2.5)
        right_angle = RightAngle(
            Line(origin, proj_end), Line(proj_end, v2_end),
            length=0.22, color="#65D6B0",
        )
        labels = VGroup(
            MathTex(r"v_1=(2,0)", color="#59C7F2").scale(0.62).next_to(v1_end, DOWN, buff=0.16),
            MathTex(r"v_2=(1,2)", color="#F4B95F").scale(0.62).next_to(v2_end, UP, buff=0.12),
            MathTex(r"\operatorname{proj}_{v_1}(v_2)=(1,0)", color="#A99BFF").scale(0.57).next_to(proj_end, DOWN, buff=0.18),
            MathTex(r"w_2=(0,2)", color="#65D6B0").scale(0.62).next_to((proj_end + v2_end) / 2, RIGHT, buff=0.12),
        )

        panel_x = 1.15
        step1 = MathTex(
            r"q_1=\frac{v_1}{\|v_1\|}=(1,0)",
            color="#59C7F2",
        ).scale(0.66).move_to([panel_x, 1.75, 0])
        step2 = MathTex(
            r"\operatorname{proj}_{v_1}(v_2)=",
            r"\frac{\langle v_2,v_1\rangle}{\|v_1\|^2}v_1=(1,0)",
            color="#A99BFF",
        ).scale(0.54).move_to([panel_x, 0.65, 0])
        step3 = MathTex(
            r"w_2=v_2-\operatorname{proj}_{v_1}(v_2)=(0,2)",
            color="#65D6B0",
        ).scale(0.53).move_to([panel_x, -0.55, 0])
        step4 = MathTex(
            r"q_2=\frac{w_2}{\|w_2\|}=(0,1)",
            color="#65D6B0",
        ).scale(0.66).move_to([panel_x, -1.55, 0])
        orthogonal = MathTex(
            r"\langle q_1,q_2\rangle=0",
            color=WHITE,
        ).scale(0.72).move_to([panel_x, -2.45, 0])

        self.play(Write(title), Create(axes), run_time=1.5)
        self.play(GrowArrow(v1), GrowArrow(v2), FadeIn(labels[0]), FadeIn(labels[1]), run_time=1.7)
        self.play(Write(step1), run_time=1.1)
        self.play(GrowArrow(projection), FadeIn(labels[2]), run_time=1.4)
        self.play(Write(step2), run_time=1.5)
        self.play(Create(guide), GrowArrow(residual), Create(right_angle), FadeIn(labels[3]), run_time=1.6)
        self.play(Write(step3), run_time=1.4)
        self.play(Write(step4), run_time=1.2)
        self.play(Write(orthogonal), run_time=1.1)
        self.wait(2)

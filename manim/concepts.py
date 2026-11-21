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
    """A sequence enters an epsilon-neighbourhood of its limit."""
    def construct(self):
        line = NumberLine(
            x_range=[0.8, 2.05, 0.05],
            length=11,
            include_numbers=True,
            numbers_to_include=[0.8, 0.9, 1.0, 1.1, 1.2, 1.5, 2.0],
            font_size=22,
            color="#91A8C0",
            include_tip=True,
        ).shift(DOWN * 0.25)
        limit_x = line.n2p(1.0)
        left_x = line.n2p(0.9)
        right_x = line.n2p(1.1)
        band = Rectangle(
            width=right_x[0] - left_x[0],
            height=0.55,
            stroke_width=0,
            fill_color="#65D6B0",
            fill_opacity=0.22,
        ).move_to((left_x + right_x) / 2 + UP * 0.02)
        limit_dot = Dot(limit_x, color="#65D6B0", radius=0.09)
        epsilon_marks = VGroup(
            DashedLine(left_x + DOWN * 0.32, left_x + UP * 0.34, color="#65D6B0"),
            DashedLine(right_x + DOWN * 0.32, right_x + UP * 0.34, color="#65D6B0"),
        )
        labels = VGroup(
            MathTex(r"1-\varepsilon").scale(0.65).next_to(left_x, DOWN, buff=0.55),
            MathTex("1").scale(0.7).next_to(limit_x, DOWN, buff=0.22),
            MathTex(r"1+\varepsilon").scale(0.65).next_to(right_x, DOWN, buff=0.55),
        )
        formula = MathTex(
            r"u_n=1+\frac1n",
            r"\qquad",
            r"|u_n-1|=\frac1n",
        ).scale(0.9).to_edge(UP, buff=0.55)
        threshold = MathTex(r"\varepsilon=0.1,\qquad N=11").scale(0.78).to_corner(UR).shift(DOWN * 1.0)
        points = VGroup(*[
            Dot(line.n2p(1 + 1 / n), color="#F4B95F", radius=0.065)
            for n in [1, 2, 3, 4, 5, 7, 10, 11, 15, 20]
        ])
        self.play(Create(line), Write(formula), run_time=2)
        self.play(FadeIn(band), Create(epsilon_marks), FadeIn(labels), FadeIn(limit_dot), run_time=1.5)
        self.play(LaggedStart(*[FadeIn(point, scale=0.6) for point in points], lag_ratio=0.18), run_time=3)
        self.play(Write(threshold), run_time=1)
        self.wait(2)


class GramSchmidtGeometry(Scene):
    """The second vector splits into a projection and an orthogonal residual."""
    def construct(self):
        axes = Axes(
            x_range=[-0.2, 2.2, 0.5],
            y_range=[-0.2, 2.0, 0.5],
            x_length=7.4,
            y_length=5.8,
            axis_config={"color": "#7186A6", "stroke_width": 2},
            tips=True,
        ).shift(DOWN * 0.35)
        origin = axes.c2p(0, 0)
        p1 = axes.c2p(1.8, 0)
        p2 = axes.c2p(1.2, 1.5)
        projection = axes.c2p(1.2, 0)
        v1 = Arrow(origin, p1, buff=0, color="#59C7F2", stroke_width=7, max_tip_length_to_length_ratio=0.12)
        v2 = Arrow(origin, p2, buff=0, color="#F4B95F", stroke_width=7, max_tip_length_to_length_ratio=0.12)
        proj = Arrow(origin, projection, buff=0, color="#A99BFF", stroke_width=6, max_tip_length_to_length_ratio=0.16)
        residual = Arrow(projection, p2, buff=0, color="#65D6B0", stroke_width=7, max_tip_length_to_length_ratio=0.16)
        guide = DashedLine(p2, projection, color="#65D6B0", stroke_width=2)
        right_angle = RightAngle(
            Line(origin, p1),
            Line(projection, p2),
            length=0.22,
            color="#65D6B0",
        )
        labels = VGroup(
            MathTex(r"v_1").set_color("#59C7F2").next_to(p1, RIGHT),
            MathTex(r"v_2").set_color("#F4B95F").next_to(p2, UP),
            MathTex(r"\operatorname{proj}_{v_1}(v_2)").set_color("#A99BFF").scale(0.65).next_to(projection, DOWN),
            MathTex(r"w_2").set_color("#65D6B0").next_to((projection + p2) / 2, RIGHT),
        )
        formula = MathTex(
            r"v_2=\operatorname{proj}_{v_1}(v_2)+w_2",
            r"\qquad",
            r"\langle v_1,w_2\rangle=0",
        ).scale(0.72).to_edge(UP, buff=0.45)
        self.play(Create(axes), Write(formula), run_time=1.8)
        self.play(GrowArrow(v1), GrowArrow(v2), run_time=1.5)
        self.play(GrowArrow(proj), FadeIn(labels[0]), FadeIn(labels[1]), run_time=1.3)
        self.play(Create(guide), GrowArrow(residual), Create(right_angle), FadeIn(labels[2]), FadeIn(labels[3]), run_time=1.8)
        self.wait(2)

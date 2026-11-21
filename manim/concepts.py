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

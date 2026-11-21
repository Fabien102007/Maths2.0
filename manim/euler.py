from manim import *
import numpy as np

config.background_color = "#07111F"


class EulerHelix(ThreeDScene):
    """Visual proof of Euler's formula, followed by its helical parametrisation."""

    def construct(self):
        self.set_camera_orientation(phi=0 * DEGREES, theta=-90 * DEGREES)

        axes = ThreeDAxes(
            x_range=[-1.45, 1.45, 1],
            y_range=[-1.45, 1.45, 1],
            z_range=[0, TAU, PI / 2],
            x_length=6.2,
            y_length=6.2,
            z_length=5.0,
            axis_config={"color": "#526985", "stroke_width": 2},
            tips=True,
        )
        x_label = MathTex("x", color=BLUE_B).scale(0.7).next_to(axes.x_axis.get_end(), RIGHT)
        y_label = MathTex("y", color=GREEN_B).scale(0.7).next_to(axes.y_axis.get_end(), UP)
        circle = ParametricFunction(
            lambda t: axes.c2p(np.cos(t), np.sin(t), 0),
            t_range=[0, TAU],
            color=BLUE_C,
            stroke_width=4,
        )
        formula = MathTex(
            r"e^{i\theta}", "=", r"\cos\theta", "+", r"i\sin\theta"
        ).scale(1.05).to_edge(UP, buff=0.32)
        theta = ValueTracker(0.15)

        radius = always_redraw(
            lambda: Line(
                axes.c2p(0, 0, 0),
                axes.c2p(np.cos(theta.get_value()), np.sin(theta.get_value()), 0),
                color=YELLOW,
                stroke_width=4,
            )
        )
        point = always_redraw(
            lambda: Dot3D(
                axes.c2p(np.cos(theta.get_value()), np.sin(theta.get_value()), 0),
                radius=0.075,
                color=YELLOW,
            )
        )
        x_projection = always_redraw(
            lambda: DashedLine(
                axes.c2p(np.cos(theta.get_value()), np.sin(theta.get_value()), 0),
                axes.c2p(np.cos(theta.get_value()), 0, 0),
                color=BLUE_B,
                dash_length=0.09,
                stroke_width=3,
            )
        )
        y_projection = always_redraw(
            lambda: DashedLine(
                axes.c2p(np.cos(theta.get_value()), np.sin(theta.get_value()), 0),
                axes.c2p(0, np.sin(theta.get_value()), 0),
                color=GREEN_B,
                dash_length=0.09,
                stroke_width=3,
            )
        )
        x_component = always_redraw(
            lambda: MathTex(r"\cos\theta", color=BLUE_B).scale(0.65).move_to(
                axes.c2p(np.cos(theta.get_value()) / 2, -0.16, 0)
            )
        )
        y_component = always_redraw(
            lambda: MathTex(r"\sin\theta", color=GREEN_B).scale(0.65).move_to(
                axes.c2p(-0.24, np.sin(theta.get_value()) / 2, 0)
            )
        )
        angle_arc = always_redraw(
            lambda: Arc(
                radius=0.48,
                start_angle=0,
                angle=theta.get_value(),
                arc_center=axes.c2p(0, 0, 0),
                color=YELLOW,
                stroke_width=3,
            )
        )
        angle_label = always_redraw(
            lambda: MathTex(r"\theta", color=YELLOW).scale(0.72).move_to(
                axes.c2p(
                    0.66 * np.cos(theta.get_value() / 2),
                    0.66 * np.sin(theta.get_value() / 2),
                    0,
                )
            )
        )

        self.play(Create(axes), FadeIn(VGroup(x_label, y_label)), Create(circle), Write(formula))
        self.play(
            Create(radius),
            FadeIn(point),
            Create(x_projection),
            Create(y_projection),
            Create(angle_arc),
            FadeIn(angle_label),
            FadeIn(x_component),
            FadeIn(y_component),
        )
        self.play(theta.animate.set_value(TAU + 0.001), run_time=7, rate_func=linear)
        self.wait(0.5)

        plane_objects = VGroup(
            circle, radius, point, x_projection, y_projection,
            x_component, y_component, angle_arc, angle_label, x_label, y_label
        )
        self.play(FadeOut(plane_objects), run_time=0.8)
        self.move_camera(phi=67 * DEGREES, theta=-48 * DEGREES, run_time=2)

        helix_formula = MathTex(
            r"\gamma(t)", "=", r"(\cos t,\sin t,t)"
        ).scale(0.95).to_edge(UP, buff=0.32)
        self.play(Transform(formula, helix_formula))

        helix = ParametricFunction(
            lambda t: axes.c2p(np.cos(t), np.sin(t), t),
            t_range=[0, TAU],
            color=TEAL_A,
            stroke_width=5,
        )
        moving_point = Dot3D(axes.c2p(1, 0, 0), radius=0.085, color=YELLOW)
        self.play(Create(helix), FadeIn(moving_point), run_time=2)
        self.begin_ambient_camera_rotation(rate=0.10)
        self.play(
            MoveAlongPath(moving_point, helix),
            run_time=6,
            rate_func=linear,
        )
        self.stop_ambient_camera_rotation()
        self.wait(1)

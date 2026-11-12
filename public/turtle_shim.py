"""Mini-module `turtle` pour pyTuto.

Le vrai module turtle dépend de tkinter (indisponible dans le navigateur).
Celui-ci garde le même vocabulaire (forward, left, penup, circle...) mais, au lieu de
dessiner, il envoie des « opérations » à la page web, qui les anime sur un canvas.
Coordonnées : origine au centre, y vers le haut, cap 0 = vers la droite (comme turtle).
"""
import math
import json

# `_emit` est injecté par le worker : il transmet un lot d'opérations (JSON) à la page.
_ops = []
_next_id = 0
_default = None
_bg = "white"

_SPEEDS = {"fastest": 0, "fast": 10, "normal": 6, "slow": 3, "slowest": 1}


def _flush():
    if _ops:
        batch = list(_ops)
        _ops.clear()
        _emit(json.dumps(batch))


def _op(o):
    _ops.append(o)
    if len(_ops) >= 200:
        _flush()


def _reset_all():
    """Appelé avant chaque exécution : repart d'une page blanche."""
    global _next_id, _default, _bg
    _ops.clear()
    _next_id = 0
    _default = None
    _bg = "white"


def _color(args):
    """Accepte 'red', '#ff0000', (255, 0, 0), ou trois nombres r, g, b."""
    if len(args) == 1:
        c = args[0]
    else:
        c = tuple(args)
    if isinstance(c, (tuple, list)):
        r, g, b = c
        if any(isinstance(v, float) for v in (r, g, b)):
            r, g, b = (int(round(v * 255)) for v in (r, g, b))
        return "rgb(%d,%d,%d)" % (r, g, b)
    return str(c)


class Turtle:
    def __init__(self, shape="classic"):
        global _next_id
        self._id = _next_id
        _next_id += 1
        self._x = 0.0
        self._y = 0.0
        self._h = 0.0
        self._pen = True
        self._pc = "black"
        self._fc = "black"
        self._w = 1
        self._speed = 4
        self._visible = True
        self._fill = None
        self._show()

    # --- affichage du sprite ---
    def _show(self):
        _op({"t": "show", "id": self._id, "v": self._visible, "c": self._pc})

    # --- déplacements ---
    def _go(self, nx, ny):
        _op({
            "t": "line", "id": self._id,
            "x1": self._x, "y1": self._y, "x2": nx, "y2": ny,
            "c": self._pc if self._pen else None,
            "w": self._w, "s": self._speed,
        })
        self._x, self._y = nx, ny
        if self._fill is not None:
            self._fill.append((nx, ny))

    def forward(self, d):
        r = math.radians(self._h)
        self._go(self._x + d * math.cos(r), self._y + d * math.sin(r))

    def backward(self, d):
        self.forward(-d)

    def _turn_to(self, h):
        self._h = h % 360
        _op({"t": "turn", "id": self._id, "h": self._h})

    def left(self, a):
        self._turn_to(self._h + a)

    def right(self, a):
        self._turn_to(self._h - a)

    def goto(self, x, y=None):
        if y is None:
            x, y = x
        self._go(float(x), float(y))

    def setx(self, x):
        self._go(float(x), self._y)

    def sety(self, y):
        self._go(self._x, float(y))

    def setheading(self, a):
        self._turn_to(a)

    def home(self):
        self._go(0.0, 0.0)
        self._turn_to(0)

    def circle(self, radius, extent=None, steps=None):
        if extent is None:
            extent = 360
        frac = abs(extent) / 360.0
        if steps is None:
            steps = 1 + int(min(11 + abs(radius) / 6.0, 59.0) * frac)
        w = 1.0 * extent / steps
        w2 = 0.5 * w
        length = 2.0 * radius * math.sin(math.radians(w2))
        if radius < 0:
            length, w, w2 = -length, -w, -w2
        self._turn_to(self._h + w2)
        for _ in range(steps):
            self.forward(length)
            self._turn_to(self._h + w)
        self._turn_to(self._h - w2)

    def dot(self, size=None, *color):
        c = _color(color) if color else self._pc
        if size is None:
            size = max(self._w + 4, self._w * 2)
        _op({"t": "dot", "x": self._x, "y": self._y, "r": size / 2.0, "c": c})

    def write(self, text, move=False, align="left", font=("Arial", 8, "normal")):
        size = font[1] if isinstance(font, (tuple, list)) and len(font) > 1 else 12
        _op({"t": "text", "x": self._x, "y": self._y, "s": str(text),
             "c": self._pc, "size": size, "align": align})

    # --- stylo ---
    def penup(self):
        self._pen = False

    def pendown(self):
        self._pen = True

    def isdown(self):
        return self._pen

    def pensize(self, w=None):
        if w is None:
            return self._w
        self._w = w

    def pencolor(self, *args):
        if not args:
            return self._pc
        self._pc = _color(args)
        self._show()

    def fillcolor(self, *args):
        if not args:
            return self._fc
        self._fc = _color(args)

    def color(self, *args):
        if not args:
            return (self._pc, self._fc)
        if len(args) == 2 and not isinstance(args[0], (int, float)):
            self._pc = _color(args[:1])
            self._fc = _color(args[1:])
        else:
            self._pc = self._fc = _color(args)
        self._show()

    def begin_fill(self):
        self._fill = [(self._x, self._y)]

    def end_fill(self):
        if self._fill is not None and len(self._fill) > 2:
            _op({"t": "fill", "pts": self._fill, "c": self._fc})
        self._fill = None

    def speed(self, s=None):
        if s is None:
            return self._speed
        if isinstance(s, str):
            s = _SPEEDS.get(s, 4)
        self._speed = 0 if s > 10 or s < 0.5 else int(round(s))

    # --- visibilité / effacement ---
    def hideturtle(self):
        self._visible = False
        self._show()

    def showturtle(self):
        self._visible = True
        self._show()

    def isvisible(self):
        return self._visible

    def clear(self):
        _op({"t": "clear"})

    def reset(self):
        _op({"t": "clear"})
        self._pen = True
        self._pc = self._fc = "black"
        self._w = 1
        self.home()
        self._show()

    def shape(self, name=None):
        return "classic"

    # --- informations ---
    def xcor(self):
        return self._x

    def ycor(self):
        return self._y

    def pos(self):
        return (self._x, self._y)

    def heading(self):
        return self._h

    def distance(self, x, y=None):
        if y is None:
            x, y = x
        return math.hypot(x - self._x, y - self._y)

    def towards(self, x, y=None):
        if y is None:
            x, y = x
        return math.degrees(math.atan2(y - self._y, x - self._x)) % 360

    # --- alias ---
    fd = forward
    bk = back = backward
    lt = left
    rt = right
    setpos = setposition = goto
    seth = setheading
    pu = up = penup
    pd = down = pendown
    width = pensize
    ht = hideturtle
    st = showturtle
    position = pos


Pen = Turtle


class _Screen:
    def bgcolor(self, *args):
        global _bg
        if not args:
            return _bg
        _bg = _color(args)
        _op({"t": "bg", "c": _bg})

    def _noop(self, *args, **kwargs):
        pass

    tracer = update = title = setup = listen = onkey = onkeypress = onkeyrelease = _noop
    onclick = onscreenclick = ontimer = colormode = delay = bye = _noop
    mainloop = done = exitonclick = _noop

    def clear(self):
        _op({"t": "clear"})

    clearscreen = clear


_screen = _Screen()


def Screen():
    return _screen


def _get_default():
    global _default
    if _default is None:
        _default = Turtle()
    return _default


def _wrap(name):
    def f(*args, **kwargs):
        return getattr(_get_default(), name)(*args, **kwargs)
    f.__name__ = name
    return f


for _n in (
    "forward fd backward bk back left lt right rt goto setpos setposition setx sety "
    "setheading seth home circle dot write penup pu up pendown pd down isdown pensize width "
    "pencolor fillcolor color begin_fill end_fill speed hideturtle ht showturtle st isvisible "
    "reset shape xcor ycor pos position heading distance towards"
).split():
    globals()[_n] = _wrap(_n)


def clear():
    _op({"t": "clear"})


clearscreen = clear
bgcolor = _screen.bgcolor
tracer = update = title = setup = listen = onkey = onkeypress = onkeyrelease = _screen._noop
onclick = onscreenclick = ontimer = colormode = delay = bye = _screen._noop
mainloop = done = exitonclick = _screen._noop

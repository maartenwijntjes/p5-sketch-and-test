from PIL import Image, ImageDraw

def draw_ellipse(image, bounds, width=1, outline='white', antialias=4):
    """Improved ellipse drawing function, based on PIL.ImageDraw."""

    # Use a single channel image (mode='L') as mask.
    # The size of the mask can be increased relative to the imput image
    # to get smoother looking results. 
    mask = Image.new(
        size=[int(dim * antialias) for dim in image.size],
        mode='L', color='black')
    draw = ImageDraw.Draw(mask)

    # draw outer shape in white (color) and inner shape in black (transparent)
    for offset, fill in (width/-2.0, 'black'), (width/2.0, 'white'):
        left, top = [(value + offset) * antialias for value in bounds[:2]]
        right, bottom = [(value - offset) * antialias for value in bounds[2:]]
        draw.ellipse([left, top, right, bottom], fill=fill)

    # downsample the mask using PIL.Image.LANCZOS 
    # (a high-quality downsampling filter).
    mask = mask.resize(image.size, Image.LANCZOS)
    # paste outline color to input image through the mask
    image.paste(outline, mask=mask)

# green background image
image = Image.new(mode='RGBA', size=(64, 64), color=(0,0,0,0))

ellipse_box = [5, 5, 59, 59]

# draw a thin black line, using higher antialias to preserve finer detail
draw_ellipse(image, ellipse_box, outline='red', width=.5, antialias=8)

image.show()
image.save('test.png')
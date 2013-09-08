
module.exports = class Rect

	constructor:(@left,@top,@width,@height) ->
		@y = @top

	update:(@left,@top,@width,@height) ->
		return

	# Clones this Rect instance.
	clone:() ->
		new Rect @left, @top, @width, @height

	# Tests if the supplied Rect is equal.
	equals:(rect) ->
		if @ == rect
			return true

		if !rect
			return false

		return @left == rect.left && @top == rect.top && @width == rect.width && @height == rect.height

	# Tests if the supplied Rect intersects.
	# Returns a boolean.
	intersects:(rect) ->
		return (@left <= rect.left + rect.width && rect.left <= @left + @width && @top <= rect.top + rect.height && rect.top <= @top + @height);

	# Tests if the supplied Rect intersects and
	# returns a new Rect object of the intersection.
	# Returns null if no intersection.
	intersection:(rect) ->
		x0 = Math.max @left, rect.left
		x1 = Math.min @left + @width, rect.left + rect.width

		if x0 <= x1
			y0 = Math.max @top, rect.top
			y1 = Math.min @top + @height, rect.top + rect.height

			if y0 <= y1
				return new Rect(x0, y0, x1 - x0, y1 - y0)

		return null;

	# Tests if the supplied Rect is contained in this Rect.
	contains:(rect) ->
			return @left <= rect.left && @left + @width >= rect.left + rect.width && @top <= rect.top && @top + @height >= rect.top + rect.height;













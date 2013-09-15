
module.exports = class Rect

	constructor:(@left,@top,@width,@height) ->

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


	# checks if a point is inside this rect.
	containsPoint:(x,y)->
		return x >= @left && x <= @left+@width && y >= @top && y <= @top+@height

	difference:(rect) ->
		intersection = @intersection(rect);
		if not intersection or not intersection.height or not intersection.width
			return @clone()

		result = []

		top = @top
		height = @height

		ar = @left + @width
		ab = @top + @height

		br = rect.left + rect.width
		bb = rect.top + rect.height

		# Subtract off any area on top where A extends past B
		if rect.top > @top 
			result.push new Rect(@left, @top, @width, rect.top - @top)
			top = rect.top
			# If we're moving the top down, we also need to subtract the height diff.
			height -= rect.top - @top

		# Subtract off any area on bottom where A extends past B
		if bb < ab 
			result.push new Rect(@left, bb, @width, ab - bb)
			height = bb - top

		# Subtract any area on left where A extends past B
		if rect.left > @left 
			result.push new Rect(@left, top, rect.left - @left, height)

		# Subtract any area on right where A extends past B
		if br < ar 
			result.push new Rect(br, top, ar - br, height)

		return result

	###
  alternative mod function ( handles negatives correctly )
  ###
	mod:(m,n)->
		return ((m % n) + n) % n

	###
	Wraps the contents of a smaller rect around a bigger rect.
	###
	wrapped:(rect)->

		result = []

		al = @mod( @left-rect.left,rect.width) + rect.left
		ar = @mod((@left + @width)-rect.left,rect.width) + rect.left
		at = @mod( @top-rect.top,rect.height ) + rect.top
		ab = @mod( (@top + @height )-rect.top,rect.height )+rect.top

		# after wrapping, check which edges have flipped ( have wrapped )
		lrFlip = ar < al
		tbFlip = ab < at

		br = rect.left + rect.width
		bb = rect.top + rect.height

		# check straight containment
		if not lrFlip && not tbFlip && al >= rect.left && ar <= br && at >= rect.top && ab <= bb
			result.push new Rect(al,at,@width,@height)
		else if lrFlip and not tbFlip
			# left or right edge intersection
			result.push new Rect(al,at,br-al,@height)
			result.push new Rect(rect.left,at,ar-rect.left,@height)
		else if tbFlip and not lrFlip
			# top or bottom edge intersection
			result.push new Rect(al,rect.top,@width,ab-rect.top)
			result.push new Rect(al,at,@width,bb-at)
		else if lrFlip and tbFlip
			# top left
			result.push new Rect(rect.left,rect.top,ar-rect.left,ab-rect.top)
			# top right
			result.push new Rect(al,rect.top,br-al,ab-rect.top)
			# bottom left
			result.push new Rect(rect.left,at,ar-rect.left,bb-at)
			# bottom right
			result.push new Rect(al,at,br-al,bb-at)

		return result





















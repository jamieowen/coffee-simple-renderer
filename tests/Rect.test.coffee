
Rect = require "../src/indexing/Rect"

exports.RectTest =
	"Test instantiation.": (test) ->
		rect = new Rect(1,2,3,4)
		test.equals rect.left, 1
		test.equals rect.top, 2
		test.equals rect.width, 3
		test.equals rect.height, 4
		test.done()

	"Test equals.": (test) ->
		rect1 = new Rect(10,10,20,20)
		rect2 = new Rect(10,10,20,20)
		rect3 = new Rect(100,100,200,200)

		test.equals rect1.equals(rect2),true
		test.equals rect2.equals(rect1),true

		test.equals rect1.equals(rect3),false
		test.equals rect2.equals(rect3),false

		test.equals rect1.equals(null),false
		test.done()

	"Test intersects.": (test) ->
		rect1 = new Rect(10,10,100,100)
		rect2 = new Rect(0,0,20,20) # intersects with above
		rect3 = new Rect(300,300,100,100) # outside
		rect4 = new Rect(50,50,10,10) # contains inside rect1

		test.equals rect2.intersects(rect1),true
		test.equals rect1.intersects(rect2),true

		test.equals rect1.intersects(rect3),false

		test.equals rect1.intersects(rect4),true
		test.equals rect4.intersects(rect1),true

		test.done()

	"Test intersection." :(test) ->
		rect1 = new Rect(10,10,100,100)
		rect2 = new Rect(0,0,20,20) # intersects with above
		rect3 = new Rect(300,300,100,100) # outside
		rect4 = new Rect(50,50,10,10) # contains inside rect1

		test.equals rect2.intersection(rect1).equals( new Rect(10,10,10,10) ),true
		test.equals rect1.intersection(rect2).equals( new Rect(10,10,10,10) ),true

		test.equals rect1.intersection(rect3),null

		# fully contained intersections should be the smaller Rect
		test.equals rect1.intersection(rect4).equals( new Rect(50,50,10,10) ),true
		test.equals rect4.intersection(rect1).equals( new Rect(50,50,10,10) ),true

		test.done()

	"Test contains." :(test) ->
		# later.
		test.done()





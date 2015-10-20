/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: document */

'use strict';

var modules = bender.amd.require(
	'document/document',
	'document/element',
	'document/character',
	'document/positioniterator',
	'document/position',
	'document/range' );

describe( 'range iterator', function() {
	var doc, expectedItems;

	var root, img1, paragraph, charB, charA, charR, img2, charX;

	var OPENING_TAG, CLOSING_TAG, CHARACTER;

	before( function() {
		var Document = modules[ 'document/document' ];

		var Element = modules[ 'document/element' ];
		var Character = modules[ 'document/character' ];

		var PositionIterator = modules[ 'document/positioniterator' ];
		OPENING_TAG = PositionIterator.OPENING_TAG;
		CLOSING_TAG = PositionIterator.CLOSING_TAG;
		CHARACTER = PositionIterator.CHARACTER;

		doc = new Document();
		root = doc.root;

		// root
		//  |- img1
		//  |- p
		//     |- B
		//     |- A
		//     |- R
		//     |
		//     |- img2
		//     |
		//     |- X
		img1 = new Element( root, 'img1' );
		root.children.push( img1 );

		paragraph = new Element( root, 'p' );
		root.children.push( paragraph );

		charB = new Character( paragraph, 'B' );
		paragraph.children.push( charB );

		charA = new Character( paragraph, 'A' );
		paragraph.children.push( charA );

		charR = new Character( paragraph, 'R' );
		paragraph.children.push( charR );

		img2 = new Element( paragraph, 'img2' );
		paragraph.children.push( img2 );

		charX = new Character( paragraph, 'X' );
		paragraph.children.push( charX );

		expectedItems = [
				{ type: OPENING_TAG, node: img1 },
				{ type: CLOSING_TAG, node: img1 },
				{ type: OPENING_TAG, node: paragraph },
				{ type: CHARACTER, node: charB },
				{ type: CHARACTER, node: charA },
				{ type: CHARACTER, node: charR },
				{ type: OPENING_TAG, node: img2 },
				{ type: CLOSING_TAG, node: img2 },
				{ type: CHARACTER, node: charX },
				{ type: CLOSING_TAG, node: paragraph }
			];
	} );

	it( 'should return next position', function() {
		var PositionIterator = modules[ 'document/positioniterator' ];
		var Position = modules[ 'document/position' ];

		var iterator = new PositionIterator( new Position( [ 0 ], doc.root ) ); // begging of root
		var i, len;

		for ( i = 0, len = expectedItems.length; i < len; i++ ) {
			expect( iterator.next() ).to.deep.equal( { done: false, value: expectedItems[ i ] } );
		}
		expect( iterator.next() ).to.have.property( 'done' ).that.is.true;
	} );

	it( 'should return previous position', function() {
		var PositionIterator = modules[ 'document/positioniterator' ];
		var Position = modules[ 'document/position' ];

		var iterator = new PositionIterator( new Position( [ 2 ], doc.root ) ); // ending of root

		for ( var i = expectedItems.length - 1; i >= 0; i-- ) {
			expect( iterator.previous() ).to.deep.equal( { done: false, value: expectedItems[ i ] } );
		}
		expect( iterator.previous() ).to.have.property( 'done' ).that.is.true;
	} );

	it( 'should return next position in the boundaries', function() {
		var PositionIterator = modules[ 'document/positioniterator' ];
		var Position = modules[ 'document/position' ];
		var Range = modules[ 'document/range' ];

		var start = new Position( [ 1, 0 ], doc.root ); // p, 0
		var end = new Position( [ 1, 3, 0 ], doc.root ); // img, 0

		var iterator = new PositionIterator( new Range( start, end ) );

		var i, len;

		for ( i = 3, len = expectedItems.length; i < 7; i++ ) {
			expect( iterator.next() ).to.deep.equal( { done: false, value: expectedItems[ i ] } );
		}
		expect( iterator.next() ).to.have.property( 'done' ).that.is.true;
	} );

	it( 'should return previous position in the boundaries', function() {
		var PositionIterator = modules[ 'document/positioniterator' ];
		var Position = modules[ 'document/position' ];
		var Range = modules[ 'document/range' ];

		var start = new Position( [ 1, 0 ], doc.root ); // p, 0
		var end = new Position( [ 1, 3, 0 ], doc.root ); // img, 0

		var iterator = new PositionIterator( new Range( start, end ), end );

		var i, len;

		for ( i = 6, len = expectedItems.length; i > 2; i-- ) {
			expect( iterator.previous() ).to.deep.equal( { done: false, value: expectedItems[ i ] } );
		}
		expect( iterator.previous() ).to.have.property( 'done' ).that.is.true;
	} );

	it( 'should return iterate over the range', function() {
		var Position = modules[ 'document/position' ];
		var Range = modules[ 'document/range' ];

		var start = new Position( [ 0 ], doc.root ); // begging of root
		var end = new Position( [ 2 ], doc.root ); // ending of root
		var range = new Range( start, end );

		var i = 0;
		var value;

		for ( value of range ) {
			expect( value ).to.deep.equal( expectedItems[ i ] );
			i++;
		}
		expect( i ).to.equal( expectedItems.length );
	} );
} );
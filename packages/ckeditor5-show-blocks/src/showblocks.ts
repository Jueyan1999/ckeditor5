/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module show-blocks/showblocks
 */

import { Plugin } from 'ckeditor5/src/core';

import ShowBlocksEditing from './showblocksediting';
import ShowBlocksUI from './showblocksui';

/**
 * The show blocks feature.
 *
 * For a detailed overview, check the {@glink features/show-blocks Show blocks} feature guide.
 */
export default class ShowBlocks extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get pluginName(): 'ShowBlocks' {
		return 'ShowBlocks';
	}

	/**
	 * @inheritDoc
	 */
	public static get requires() {
		return [ ShowBlocksEditing, ShowBlocksUI ] as const;
	}
}

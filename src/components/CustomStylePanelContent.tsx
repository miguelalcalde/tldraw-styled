'use client'
import { useState, useCallback, memo } from 'react'
import {
	DefaultFontStyle,
	StylePanelButtonPickerInline,
	useStylePanelContext,
	useEditor,
	tlmenus,
	TldrawUiPopover,
	TldrawUiPopoverContent,
	TldrawUiPopoverTrigger,
	TldrawUiToolbar,
	TldrawUiToolbarButton,
	TldrawUiMenuContextProvider,
	TldrawUiButtonIcon,
} from 'tldraw'

/** Pixelated "Aa" icon for the Geist Pixel font button */
function PixelAaIcon() {
	return (
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			{/* Pixelated "A" on the left */}
			<rect x="3" y="13" width="2" height="2" fill="currentColor" />
			<rect x="3" y="11" width="2" height="2" fill="currentColor" />
			<rect x="3" y="9" width="2" height="2" fill="currentColor" />
			<rect x="3" y="7" width="2" height="2" fill="currentColor" />
			<rect x="5" y="5" width="2" height="2" fill="currentColor" />
			<rect x="7" y="3" width="2" height="2" fill="currentColor" />
			<rect x="5" y="9" width="2" height="2" fill="currentColor" />
			<rect x="7" y="9" width="2" height="2" fill="currentColor" />
			<rect x="9" y="5" width="2" height="2" fill="currentColor" />
			<rect x="9" y="9" width="2" height="2" fill="currentColor" />
			<rect x="11" y="7" width="2" height="2" fill="currentColor" />
			<rect x="11" y="9" width="2" height="2" fill="currentColor" />
			<rect x="11" y="11" width="2" height="2" fill="currentColor" />
			<rect x="11" y="13" width="2" height="2" fill="currentColor" />
			{/* Pixelated "a" on the right - smaller */}
			<rect x="14" y="9" width="1.5" height="1.5" fill="currentColor" />
			<rect x="14" y="10.5" width="1.5" height="1.5" fill="currentColor" />
			<rect x="14" y="12" width="1.5" height="1.5" fill="currentColor" />
			<rect x="14" y="13.5" width="1.5" height="1.5" fill="currentColor" />
			<rect x="15.5" y="9" width="1.5" height="1.5" fill="currentColor" />
			<rect x="15.5" y="12" width="1.5" height="1.5" fill="currentColor" />
			<rect x="15.5" y="13.5" width="1.5" height="1.5" fill="currentColor" />
		</svg>
	)
}

/** Pixel example icons — small visual representations of each variant */
function PixelSquareIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="3" y="3" width="10" height="10" fill="currentColor" />
		</svg>
	)
}

function PixelGridIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="2" y="2" width="3" height="3" fill="currentColor" />
			<rect x="6.5" y="2" width="3" height="3" fill="currentColor" />
			<rect x="11" y="2" width="3" height="3" fill="currentColor" />
			<rect x="2" y="6.5" width="3" height="3" fill="currentColor" />
			<rect x="6.5" y="6.5" width="3" height="3" fill="currentColor" />
			<rect x="11" y="6.5" width="3" height="3" fill="currentColor" />
			<rect x="2" y="11" width="3" height="3" fill="currentColor" />
			<rect x="6.5" y="11" width="3" height="3" fill="currentColor" />
			<rect x="11" y="11" width="3" height="3" fill="currentColor" />
		</svg>
	)
}

function PixelCircleIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="5" y="2" width="2" height="2" fill="currentColor" />
			<rect x="7" y="2" width="2" height="2" fill="currentColor" />
			<rect x="9" y="2" width="2" height="2" fill="currentColor" />
			<rect x="3" y="4" width="2" height="2" fill="currentColor" />
			<rect x="11" y="4" width="2" height="2" fill="currentColor" />
			<rect x="2" y="6" width="2" height="2" fill="currentColor" />
			<rect x="12" y="6" width="2" height="2" fill="currentColor" />
			<rect x="2" y="8" width="2" height="2" fill="currentColor" />
			<rect x="12" y="8" width="2" height="2" fill="currentColor" />
			<rect x="3" y="10" width="2" height="2" fill="currentColor" />
			<rect x="11" y="10" width="2" height="2" fill="currentColor" />
			<rect x="5" y="12" width="2" height="2" fill="currentColor" />
			<rect x="7" y="12" width="2" height="2" fill="currentColor" />
			<rect x="9" y="12" width="2" height="2" fill="currentColor" />
		</svg>
	)
}

function PixelTriangleIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="7" y="2" width="2" height="2" fill="currentColor" />
			<rect x="6" y="4" width="2" height="2" fill="currentColor" />
			<rect x="8" y="4" width="2" height="2" fill="currentColor" />
			<rect x="5" y="6" width="2" height="2" fill="currentColor" />
			<rect x="9" y="6" width="2" height="2" fill="currentColor" />
			<rect x="4" y="8" width="2" height="2" fill="currentColor" />
			<rect x="10" y="8" width="2" height="2" fill="currentColor" />
			<rect x="3" y="10" width="2" height="2" fill="currentColor" />
			<rect x="11" y="10" width="2" height="2" fill="currentColor" />
			<rect x="2" y="12" width="2" height="2" fill="currentColor" />
			<rect x="4" y="12" width="2" height="2" fill="currentColor" />
			<rect x="6" y="12" width="2" height="2" fill="currentColor" />
			<rect x="8" y="12" width="2" height="2" fill="currentColor" />
			<rect x="10" y="12" width="2" height="2" fill="currentColor" />
			<rect x="12" y="12" width="2" height="2" fill="currentColor" />
		</svg>
	)
}

function PixelLineIcon() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="2" y="7" width="2" height="2" fill="currentColor" />
			<rect x="5" y="7" width="2" height="2" fill="currentColor" />
			<rect x="8" y="7" width="2" height="2" fill="currentColor" />
			<rect x="11" y="7" width="2" height="2" fill="currentColor" />
		</svg>
	)
}

const PIXEL_VARIANT_ICONS: Record<string, () => React.ReactNode> = {
	square: PixelSquareIcon,
	grid: PixelGridIcon,
	circle: PixelCircleIcon,
	triangle: PixelTriangleIcon,
	line: PixelLineIcon,
}

const PIXEL_VARIANTS = [
	{ value: 'square', label: 'Square' },
	{ value: 'grid', label: 'Grid' },
	{ value: 'circle', label: 'Circle' },
	{ value: 'triangle', label: 'Triangle' },
	{ value: 'line', label: 'Line' },
] as const

type PixelVariant = (typeof PIXEL_VARIANTS)[number]['value']

// Font items for the main picker (sans, serif, mono — no draw)
const MAIN_FONT_ITEMS = [
	{ value: 'sans' as const, icon: 'font-sans' as const },
	{ value: 'serif' as const, icon: 'font-serif' as const },
	{ value: 'mono' as const, icon: 'font-mono' as const },
]

/** Pixel font dropdown that sets font=draw and switches the CSS variable */
const PixelFontDropdown = memo(function PixelFontDropdown({
	isActive,
	pixelVariant,
	onSelectVariant,
}: {
	isActive: boolean
	pixelVariant: PixelVariant
	onSelectVariant: (variant: PixelVariant) => void
}) {
	const editor = useEditor()
	const ctx = useStylePanelContext()
	const [isOpen, setIsOpen] = useState(false)
	const popoverId = 'style panel pixel-font'

	const handleSelect = useCallback(
		(variant: PixelVariant) => {
			// Set font style to "draw" (maps to --tl-font-draw CSS variable)
			ctx.onHistoryMark('select pixel variant')
			ctx.onValueChange(DefaultFontStyle, 'draw')
			onSelectVariant(variant)
			tlmenus.deleteOpenMenu(popoverId, editor.contextId)
			setIsOpen(false)
		},
		[ctx, editor, onSelectVariant, popoverId]
	)

	return (
		<TldrawUiPopover
			id={popoverId}
			open={isOpen}
			onOpenChange={setIsOpen}
			className="tlui-style-panel__dropdown-picker"
		>
			<TldrawUiPopoverTrigger>
				<TldrawUiToolbarButton
					type="icon"
					data-testid="style.font.pixel"
					data-direction="left"
					title={`Pixel — ${pixelVariant}`}
					isActive={isActive}
				>
					<PixelAaIcon />
				</TldrawUiToolbarButton>
			</TldrawUiPopoverTrigger>
			<TldrawUiPopoverContent side="left" align="center">
				<TldrawUiToolbar orientation="horizontal" label="Pixel variants">
					<TldrawUiMenuContextProvider type="icons" sourceId="style-panel">
						{PIXEL_VARIANTS.map((variant) => (
							<TldrawUiToolbarButton
								key={variant.value}
								type="icon"
								data-testid={`style.font.pixel.${variant.value}`}
								title={`Pixel — ${variant.label}`}
								isActive={isActive && pixelVariant === variant.value}
								onClick={() => handleSelect(variant.value)}
							>
								{(() => {
									const Icon = PIXEL_VARIANT_ICONS[variant.value]
									return <Icon />
								})()}
							</TldrawUiToolbarButton>
						))}
					</TldrawUiMenuContextProvider>
				</TldrawUiToolbar>
			</TldrawUiPopoverContent>
		</TldrawUiPopover>
	)
})

/** Custom font picker: [Sans] [Serif] [Mono] [Pixel ▾] */
export const CustomFontPicker = memo(function CustomFontPicker({
	pixelVariant,
	onSelectPixelVariant,
}: {
	pixelVariant: PixelVariant
	onSelectPixelVariant: (variant: PixelVariant) => void
}) {
	const { styles } = useStylePanelContext()
	const font = styles.get(DefaultFontStyle)
	if (font === undefined) return null

	const isPixelActive = font.type === 'shared' && font.value === 'draw'

	return (
		<TldrawUiToolbar orientation="horizontal" label="Font">
			<StylePanelButtonPickerInline
				title="Font"
				uiType="font"
				style={DefaultFontStyle}
				items={MAIN_FONT_ITEMS}
				value={font}
			/>
			<PixelFontDropdown
				isActive={isPixelActive}
				pixelVariant={pixelVariant}
				onSelectVariant={onSelectPixelVariant}
			/>
		</TldrawUiToolbar>
	)
})

export type { PixelVariant }

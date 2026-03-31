'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
	Tldraw,
	DefaultColorThemePalette,
	DefaultDashStyle,
	DefaultFontStyle,
	DefaultStylePanel,
	StylePanelSection,
	StylePanelColorPicker,
	StylePanelOpacityPicker,
	StylePanelFillPicker,
	StylePanelDashPicker,
	StylePanelSizePicker,
	StylePanelTextAlignPicker,
	StylePanelLabelAlignPicker,
	StylePanelGeoShapePicker,
	StylePanelArrowKindPicker,
	StylePanelArrowheadPicker,
	StylePanelSplinePicker,
	type TLUiStylePanelProps,
	type Editor,
} from 'tldraw'
import {
	CustomFontPicker,
	type PixelVariant,
} from '@/components/CustomStylePanelContent'

// Remap shape colors to muted, professional monochrome-leaning palette
const light = DefaultColorThemePalette.lightMode

light.background = '#ffffff'
light.solid = '#ffffff'
light.text = '#000000'

function color(solid: string, semi: string, note: string) {
	return {
		solid,
		fill: solid,
		linedFill: solid,
		semi,
		pattern: solid,
		noteFill: note,
		noteText: '#000000',
		frameStroke: solid,
		frameHeadingStroke: solid,
		frameHeadingFill: '#ffffff',
		frameFill: '#ffffff',
		frameText: '#000000',
	}
}

Object.assign(light.black, color('#000000', '#e5e5e5', '#fafafa'))
Object.assign(light.grey, color('#888888', '#f0f0f0', '#f5f5f5'))
Object.assign(light.white, {
	...color('#ffffff', '#f5f5f5', '#ffffff'),
	frameStroke: '#d4d4d4',
	frameHeadingStroke: '#d4d4d4',
})
Object.assign(light.blue, color('#4a7dbd', '#e8eef5', '#f0f4f9'))
Object.assign(light['light-blue'], color('#6a9fd8', '#eaf1f8', '#f2f7fb'))
Object.assign(light.red, color('#c25555', '#f3e5e5', '#f8f0f0'))
Object.assign(light['light-red'], color('#d48a8a', '#f5eded', '#f9f3f3'))
Object.assign(light.green, color('#5a9e7c', '#e5f0ea', '#f0f7f3'))
Object.assign(light['light-green'], color('#7ab896', '#eaf5ef', '#f2f9f5'))
Object.assign(light.yellow, color('#c4a24e', '#f3efe0', '#f8f5ec'))
Object.assign(light.orange, color('#c07840', '#f1e8de', '#f7f1ea'))
Object.assign(light.violet, color('#8a6aad', '#ede7f3', '#f4f0f8'))
Object.assign(light['light-violet'], color('#ae92c8', '#f0eaf5', '#f6f2f9'))

export default function Home() {
	const [pixelVariant, setPixelVariant] = useState<PixelVariant>('square')
	const editorRef = useRef<Editor | null>(null)

	useEffect(() => {
		if (editorRef.current) {
			const container = editorRef.current.getContainer()
			container.setAttribute('data-pixel-variant', pixelVariant)
		}
	}, [pixelVariant])

	const handleMount = useCallback((editor: Editor) => {
		editorRef.current = editor
		editor.setStyleForNextShapes(DefaultDashStyle, 'solid')
		editor.setStyleForNextShapes(DefaultFontStyle, 'sans')
		editor.getContainer().setAttribute('data-pixel-variant', 'square')
	}, [])

	const StylePanel = useCallback(
		(props: TLUiStylePanelProps) => (
			<DefaultStylePanel {...props}>
				<StylePanelSection>
					<StylePanelColorPicker />
					<StylePanelOpacityPicker />
				</StylePanelSection>
				<StylePanelSection>
					<StylePanelFillPicker />
					<StylePanelDashPicker />
					<StylePanelSizePicker />
				</StylePanelSection>
				<StylePanelSection>
					<CustomFontPicker
						pixelVariant={pixelVariant}
						onSelectPixelVariant={setPixelVariant}
					/>
					<StylePanelTextAlignPicker />
					<StylePanelLabelAlignPicker />
				</StylePanelSection>
				<StylePanelSection>
					<StylePanelGeoShapePicker />
					<StylePanelArrowKindPicker />
					<StylePanelArrowheadPicker />
					<StylePanelSplinePicker />
				</StylePanelSection>
			</DefaultStylePanel>
		),
		[pixelVariant]
	)

	return (
		<main>
			<div style={{ position: 'fixed', inset: 0 }}>
				<Tldraw
					onMount={handleMount}
					components={{
						StylePanel,
					}}
				/>
			</div>
		</main>
	)
}

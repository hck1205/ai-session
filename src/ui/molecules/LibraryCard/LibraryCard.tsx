import { memo } from 'react'
import { Typography, LabelBadge, IconButton, ModifyIcon, DeleteIcon } from '@clovirtualfashion/components'
import { Root, Header, TitleArea, Body, MetaText, PriceText, Actions } from './LibraryCard.styled'
import { useLibraryCard } from './LibraryCard.hook'
import type { LibraryCardProps } from './LibraryCard.types'

/**
 * 원부자재 라이브러리 카드.
 * @memo 목록 렌더링에서 불필요한 리렌더 방지
 */
export const LibraryCard = memo(({
  id, title, subtitle, badge, meta, price, accentColor,
  onClick, onEdit, onDelete, className,
}: LibraryCardProps) => {
  const { handleClick, handleEdit, handleDelete } = useLibraryCard({ id, onClick, onEdit, onDelete })
  const hasActions = !!(onEdit || onDelete)

  return (
    <Root isInteractive={!!onClick} accentColor={accentColor} onClick={handleClick} className={className}>
      <Header>
        <TitleArea>
          <Typography typoName="Normal/Body/3/Bold">{title}</Typography>
        </TitleArea>
        {hasActions && (
          <Actions className="card-actions">
            {onEdit && (
              <IconButton
                icon={ModifyIcon}
                size="xs"
                styleType="mono"
                backgroundType="glass"
                onClick={handleEdit}
              />
            )}
            {onDelete && (
              <IconButton
                icon={DeleteIcon}
                size="xs"
                styleType="mono"
                backgroundType="glass"
                onClick={handleDelete}
              />
            )}
          </Actions>
        )}
        {badge && <LabelBadge text={badge} color="gray" variant="stroke" size="s" />}
      </Header>
      <Body>
        {subtitle && <MetaText>{subtitle}</MetaText>}
        {meta && <MetaText>{meta}</MetaText>}
        {price && <PriceText>{price}</PriceText>}
      </Body>
    </Root>
  )
})

LibraryCard.displayName = 'LibraryCard'

import React from 'react'
import { Tag, VerifiedIcon, CommunityIcon, HuobiIcon } from '@ogeefinance/uikit'

const CoreTag = (props) => (
  <Tag variant="secondary" outline startIcon={<VerifiedIcon />} {...props}>
    Core
  </Tag>
)

const CommunityTag = (props) => (
  <Tag variant="textSubtle" outline startIcon={<CommunityIcon />} {...props}>
    Community
  </Tag>
)

const BinanceTag = (props) => (
  <Tag variant="huobi" outline startIcon={<HuobiIcon />} {...props}>
    Huobi
  </Tag>
)

const DualTag = (props) => (
  <Tag variant="textSubtle" outline {...props}>
    Dual
  </Tag>
)

export { CoreTag, CommunityTag, BinanceTag, DualTag }

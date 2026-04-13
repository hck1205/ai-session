import type { Item } from '../../types'

export const itemSeeds: Item[] = [
  // Fabrics
  { id: 'item-001', itemCode: 'ITM-F001', itemType: 'Fabric',  name: 'Organic Cotton Jersey',       price: 4.5,  priceUnit: 'USD/yd',    detailId: 'fabric-001' },
  { id: 'item-002', itemCode: 'ITM-F002', itemType: 'Fabric',  name: 'Stretch Denim Twill',         price: 6.8,  priceUnit: 'USD/yd',    detailId: 'fabric-002' },
  { id: 'item-003', itemCode: 'ITM-F003', itemType: 'Fabric',  name: 'Chino Cotton Twill',          price: 5.2,  priceUnit: 'USD/yd',    detailId: 'fabric-003' },
  { id: 'item-004', itemCode: 'ITM-F004', itemType: 'Fabric',  name: 'Silk Charmeuse',              price: 28.0, priceUnit: 'USD/yd',    detailId: 'fabric-004' },
  { id: 'item-005', itemCode: 'ITM-F005', itemType: 'Fabric',  name: 'Merino Wool Rib',             price: 18.0, priceUnit: 'USD/yd',    detailId: 'fabric-005' },
  { id: 'item-006', itemCode: 'ITM-F006', itemType: 'Fabric',  name: 'French Terry Fleece',         price: 5.8,  priceUnit: 'USD/yd',    detailId: 'fabric-006' },
  { id: 'item-007', itemCode: 'ITM-F007', itemType: 'Fabric',  name: 'Linen Canvas',                price: 9.5,  priceUnit: 'USD/yd',    detailId: 'fabric-007' },
  { id: 'item-008', itemCode: 'ITM-F008', itemType: 'Fabric',  name: 'Velvet Fabric',               price: 12.0, priceUnit: 'USD/yd',    detailId: 'fabric-008' },
  { id: 'item-009', itemCode: 'ITM-F009', itemType: 'Fabric',  name: 'Recycled Nylon Ripstop',      price: 7.5,  priceUnit: 'USD/yd',    detailId: 'fabric-010' },
  { id: 'item-010', itemCode: 'ITM-F010', itemType: 'Fabric',  name: 'Double-Face Cashmere',        price: 85.0, priceUnit: 'USD/yd',    detailId: 'fabric-013' },
  // Trims
  { id: 'item-011', itemCode: 'ITM-T001', itemType: 'Trim',    name: 'Grosgrain Ribbon Tape 15mm',  price: 0.80, priceUnit: 'USD/yd',    detailId: 'trim-001' },
  { id: 'item-012', itemCode: 'ITM-T002', itemType: 'Trim',    name: 'D-Ring Buckle 25mm',          price: 0.45, priceUnit: 'USD/piece', detailId: 'trim-002' },
  { id: 'item-013', itemCode: 'ITM-T003', itemType: 'Trim',    name: 'Elastic Waistband 30mm',      price: 0.60, priceUnit: 'USD/yd',    detailId: 'trim-003' },
  { id: 'item-014', itemCode: 'ITM-T004', itemType: 'Trim',    name: 'Velcro Hook & Loop 20mm',     price: 0.55, priceUnit: 'USD/yd',    detailId: 'trim-006' },
  { id: 'item-015', itemCode: 'ITM-T005', itemType: 'Trim',    name: 'Metal Eyelet 10mm',           price: 0.08, priceUnit: 'USD/piece', detailId: 'trim-008' },
  // Buttons
  { id: 'item-016', itemCode: 'ITM-B001', itemType: 'Button',  name: 'Horn Button 20mm',            price: 0.35, priceUnit: 'USD/piece', detailId: 'button-001' },
  { id: 'item-017', itemCode: 'ITM-B002', itemType: 'Button',  name: 'Metal Shank Button 18mm',     price: 0.55, priceUnit: 'USD/piece', detailId: 'button-002' },
  { id: 'item-018', itemCode: 'ITM-B003', itemType: 'Button',  name: 'Resin Button 15mm',           price: 0.12, priceUnit: 'USD/piece', detailId: 'button-003' },
  { id: 'item-019', itemCode: 'ITM-B004', itemType: 'Button',  name: 'Mother of Pearl Button 12mm', price: 0.85, priceUnit: 'USD/piece', detailId: 'button-004' },
  { id: 'item-020', itemCode: 'ITM-B005', itemType: 'Button',  name: 'Jean Tack Button 17mm',       price: 0.28, priceUnit: 'USD/piece', detailId: 'button-008' },
  // Zippers
  { id: 'item-021', itemCode: 'ITM-Z001', itemType: 'Zipper',  name: 'YKK #5 Nylon Coil Zipper',   price: 0.95, priceUnit: 'USD/piece', detailId: 'zipper-001' },
  { id: 'item-022', itemCode: 'ITM-Z002', itemType: 'Zipper',  name: 'YKK #3 Invisible Zipper',    price: 0.75, priceUnit: 'USD/piece', detailId: 'zipper-002' },
  { id: 'item-023', itemCode: 'ITM-Z003', itemType: 'Zipper',  name: 'SBS #8 Metal Zipper Two-Way',price: 2.80, priceUnit: 'USD/piece', detailId: 'zipper-003' },
  { id: 'item-024', itemCode: 'ITM-Z004', itemType: 'Zipper',  name: 'Opti #5 Brass Zipper',       price: 1.20, priceUnit: 'USD/piece', detailId: 'zipper-005' },
  { id: 'item-025', itemCode: 'ITM-Z005', itemType: 'Zipper',  name: 'RIRI #8 Luxury Metal Zipper',price: 6.50, priceUnit: 'USD/piece', detailId: 'zipper-010' },
  // Graphics
  { id: 'item-026', itemCode: 'ITM-G001', itemType: 'Graphic', name: 'Logo Embroidery Patch',       price: 1.20, priceUnit: 'USD/piece', detailId: 'graphic-001' },
  { id: 'item-027', itemCode: 'ITM-G002', itemType: 'Graphic', name: 'Woven Label Brand Tag',       price: 0.25, priceUnit: 'USD/piece', detailId: 'graphic-002' },
  { id: 'item-028', itemCode: 'ITM-G003', itemType: 'Graphic', name: 'Screen Print Transfer Front', price: 0.90, priceUnit: 'USD/piece', detailId: 'graphic-003' },
  { id: 'item-029', itemCode: 'ITM-G004', itemType: 'Graphic', name: 'Rubber Patch Logo',           price: 0.55, priceUnit: 'USD/piece', detailId: 'graphic-005' },
  { id: 'item-030', itemCode: 'ITM-G005', itemType: 'Graphic', name: 'Care Label Set',              price: 0.10, priceUnit: 'USD/piece', detailId: 'graphic-012' },
]

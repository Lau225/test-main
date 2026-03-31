export function transformMenuData(originalData, prefix = 'M') {
  if (!Array.isArray(originalData)) {
    console.error('原始数据必须是数组');
    return [];
  }

  const result = [];
  let idCounter = 1;
  const parentMap = new Map();

  // 生成带前缀的ID
  const generateId = (num) => `${prefix}-${num}`;

  // 第一遍遍历：处理所有菜单项，判断是否为父级
  originalData.forEach(item => {
    const hasItems = item.items && Array.isArray(item.items) && item.items.length > 0;

    const menuItem = {
      id: generateId(idCounter),
      parentId: null,
      menuName: item.name,
      menuUrl: !hasItems && item.path ? item.path : '',
      menuComponent: !hasItems && item.component ? item.component : '',
      permissionUrl: '',
      Order: idCounter,
      Remark: ''
    };

    // 如果是父级菜单，保存映射关系
    if (hasItems) {
      parentMap.set(item.id, generateId(idCounter));
    }

    result.push(menuItem);
    idCounter++;
  });

  // 第二遍遍历：处理所有子菜单项
  originalData.forEach(item => {
    const hasItems = item.items && Array.isArray(item.items) && item.items.length > 0;

    if (hasItems) {
      const parentId = parentMap.get(item.id);

      if (parentId) {
        item.items.forEach(childItem => {
          const childMenu = {
            id: generateId(idCounter),
            parentId: parentId,
            menuName: childItem.name,
            menuUrl: childItem.path || '',
            menuComponent: childItem.component || '',
            permissionUrl: '',
            Order: idCounter,
            Remark: ''
          };

          result.push(childMenu);
          idCounter++;
        });
      }
    }
  });

  return result;
}

export function reverseTransformMenuData(transformedData) {
  if (!Array.isArray(transformedData)) {
    console.error('转换后的数据必须是数组');
    return [];
  }

  const result = [];
  const parentMenus = new Map();
  const childMenus = new Map();

  // 分离父级菜单和子菜单
  transformedData.forEach(item => {
    // 验证必要字段
    if (!item.id || !item.menuName) {
      console.warn('菜单项缺少必要字段，跳过:', item);
      return;
    }

    if (item.parentId === null || item.parentId === undefined) {
      // 父级菜单
      const parentMenu = {
        id: item.originalId || item.id.toString(),
        name: item.menuName
      };
      
      // 如果有路径和组件信息，添加
      if (item.menuUrl) parentMenu.path = item.menuUrl;
      if (item.menuComponent) parentMenu.component = item.menuComponent;
      
      parentMenus.set(item.id, parentMenu);
    } else {
      // 子菜单
      const parentId = item.parentId;
      if (!childMenus.has(parentId)) {
        childMenus.set(parentId, []);
      }
      
      const childItem = {
        id: item.originalId || item.id.toString(),
        name: item.menuName
      };
      
      if (item.menuUrl) childItem.path = item.menuUrl;
      if (item.menuComponent) childItem.component = item.menuComponent;
      
      childMenus.get(parentId).push(childItem);
    }
  });

  // 构建嵌套结构
  parentMenus.forEach((parent, parentId) => {
    const parentMenu = { ...parent };
    
    // 如果有子菜单，添加items字段
    if (childMenus.has(parentId)) {
      parentMenu.items = childMenus.get(parentId);
    }
    
    result.push(parentMenu);
  });

  return result;
}

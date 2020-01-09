import {BehaviorSubject} from 'rxjs';
import DefaultMockData from '../default-mock-data.json';

class NavigatorService {
  constructor() {
    this.mockData = new BehaviorSubject(DefaultMockData);
  }

  updateMockData(str) {
    try {
      const jsonData = JSON.parse(str);
      this.mockData.next(jsonData);
      return true;
    } catch (error) {
      return false;
    }
  }

  static parseNode(node, path, name) {
    const children = Object.entries(node.children || {});
    return {
      pathArray: path === '/' ? ['/'] : ['/', ...path.split('/').filter(item => !!item)],
      name,
      type: node.type,
      hasContents: !!children && children.length > 0,
      children: children
        .map(([childFileName, childNode]) => ({
          name: childFileName,
          type: childNode.type,
          hasContents: !!childNode.children && Object.keys(childNode.children).length > 0,
        }))
    };
  }

  /*
   * path should be in unix format
   * e.g. /home/myname/filea.txt
   */
  async getContents(path) {
    try {
      // const data = await fetch('URL').then(res => res.json()) || {};
      const data = {...(this.mockData.value || {})};
      const splittedPath = path.split('/')
        .filter(item => !!item);
      if (splittedPath.length === 0) {
        return NavigatorService.parseNode(data, path, '/');
      }
      return splittedPath
        .reduce((data, fileName, index, arr) => {
          if (!data) {
            return null;
          }
          const node = (data.children || {})[fileName];
          const isLast = arr.length === index + 1;
          if (isLast) {
            return NavigatorService.parseNode(node, path, fileName);
          }
          return node;
        }, data);
    } catch (error) {
      return null;
    }
  }
}

export default NavigatorService;
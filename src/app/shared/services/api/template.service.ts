import { EmsService } from './ems.service';
import { Badge } from './../../models/badge';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';

import { Template } from '../../models/template';

@Injectable()
export class TemplateService extends EmsService<Template> {

    constructor(proxy: ProxyService) {
      super(proxy, 'mailTemplates');
    }
}

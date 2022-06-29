import {
  Compiler, ComponentRef, Directive, Injector, Input, NgModuleFactory, Type, ViewContainerRef,
} from '@angular/core'

export interface SectionsDynamic {
  type: string;
  data: any;
}

export const SECTIONS: Map<string, Function> = new Map<string, Function>([
  [
    'section-header',
    () => import('../../section-header/section-header.module')
      .then(({ SectionHeaderModule }) => SectionHeaderModule),
  ],
])

@Directive({
  selector: '[lazyLoad]',
})
export class LazyLoadDirective {
  protected compRef!: ComponentRef<SectionsDynamic>

  @Input('lazyLoad') set lazyLoad(section: SectionsDynamic) {
    if (section.type) {
      this.load(section)
    }
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private compiler: Compiler,
  ) {}

  private async load(section: SectionsDynamic) {
    if (!this.existsModule(section.type)) {
      console.warn(`Unknown module of: ${section.type}`)
    } else {
      this.compileAndCreate(section)
    }
  }

  private async compileAndCreate(section: SectionsDynamic): Promise<void> {
   const foundModule = this.findModule(section.type)
   if (foundModule) {
     const module = await foundModule()
     const moduleFactory = await this.compileModule(module)
     const moduleRef = moduleFactory.create(this.injector)
     const componentFactory = moduleRef.componentFactoryResolver
      .resolveComponentFactory<SectionsDynamic>(module.entry)
     this.compRef = this.viewContainerRef.createComponent<SectionsDynamic>(componentFactory)
     this.compRef.instance['data'] = section ?? null
     this.compRef.hostView.detectChanges()
   }
  }

  private existsModule(type: string): boolean {
    return SECTIONS.has(type)
  }

  private findModule(type: string): Function | undefined {
    return SECTIONS.get(type)
  }

  protected compileModule(module: Type<SectionsDynamic> | NgModuleFactory<SectionsDynamic>):
    NgModuleFactory<SectionsDynamic> | Promise<NgModuleFactory<SectionsDynamic>> {
    return (module instanceof NgModuleFactory
      ? module
      : this.compiler.compileModuleAsync<SectionsDynamic>(module))
  }
}

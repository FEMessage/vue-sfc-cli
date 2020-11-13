import Vue, {VueConstructor} from 'vue'

/**
 * @FYI https://www.yuque.com/docs/share/a72a1b84-c0e4-4bd5-853f-6711cb08a507
 */
declare module '@{{ownerNameLowerCase}}/{{componentName}}' {
  class VueComponent extends Vue {
    static install(vue: typeof Vue): void
  }

  type CombinedVueInstance<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = Data & Methods & Computed & Props & Instance

  type ExtendedVue<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = VueConstructor<
    CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue
  >

  type Combined<Data, Methods, Computed, Props> = Data &
    Methods &
    Computed &
    Props

  type {{componentNamePascal}}Data = {}

  type {{componentNamePascal}}Methods = {}

  type {{componentNamePascal}}Computed = {}

  type {{componentNamePascal}}Props = {}

  type {{componentNamePascal}} = Combined<
    {{componentNamePascal}}Data,
    {{componentNamePascal}}Methods,
    {{componentNamePascal}}Computed,
    {{componentNamePascal}}Props
  >

  export interface {{componentNamePascal}}Type extends VueComponent, {{componentNamePascal}} {}

  const {{componentNamePascal}}Construction: ExtendedVue<
    Vue,
    {{componentNamePascal}}Data,
    {{componentNamePascal}}Methods,
    {{componentNamePascal}}Computed,
    {{componentNamePascal}}Props
  >

  export default {{componentNamePascal}}Construction
}

WidgetRegistry = [(WidgetId, Widget)] // dictionary of existing widgets by id

DashboardConfig = {
    DashboardId // id of dashboard config
    LayoutConfig //config for layout
    WidgetLayoutMap //mapping between existing panels and widgets
    WidgetsConfig //config for widgets like settings and so on
}

LayoutConfig = [PanelConfig]
PanelConfig = {
    i:: String //id of panel
    w: Int // width of panel
    h: Int // height of panel
    x: Int // x-position of panel
    y: Int // y-position of panel
}
WidgetConfigs = [WidgetConfig]
WidgetConfig = {
    WidgetId:: String,
    Settings
}
WidgetLayoutMap = [(PanelId, WidgetId)]


/* Ajax requests */
service = {
    /* Returns layout config for widget's panels*/
    getLayoutConfig::  DashboardId -> LayoutConfig 

    /* Returns configuration for widget */
    getWidgetConfig :: DashboardId -> WidgetId -> WidgetConfig

    /* Returns per user configuration */
    getWidgetConfigForUser :: UserId -> DashboardId -> WidgetId -> WidgetConfig

    /* Returns history data for list of channels in @DateRange. */
    getChannelsData :: [ChannelId] -> DateRange -> [(ChannelId, [Point])] 


}
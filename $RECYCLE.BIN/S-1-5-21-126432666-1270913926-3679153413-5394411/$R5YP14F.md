# adaptors.xml file changes

`Note: The changes in adaptors.xml file needs to be done at Capital-X “Client” side.`
`Enable following TC adpators in adaptors.xml file (The file is located at <CAPITAL-X_HOME>\adaptors\adaptors.xml)`
<document format="capitaltc"
    class="chs.bridges.adaptors.tceng.TeamcenterCADFileExchangeFormat"
    description="Teamcenter - CAD File Exchange"
    suffix="xml"
    propFile="resources/TCCAD.properties"
    applications="Logic Designer, Project Manager, Systems Integrator, Harness Designer, Harness Designer Modular, Modeler,Architect"
/>

<document format="capitaltc"
    class="chs.bridges.adaptors.tceng.TeamcenterBOMFormat"
    description="Teamcenter - Harness Report Exchange"
    suffix="plmxml"
    propFile="resources/TCBOM.properties"
    applications="Harness Designer, Harness Designer Modular"
/>

<document format="capitaltc"
    class="chs.bridges.adaptors.tceng.TeamcenterLogicBOMFormat"
    description="Teamcenter - Logic Designer Report Exchange"
    suffix="plmxml"
    propFile="resources/TCLogicBOM.properties"
    applications="Logic Designer"
/>

<document format="capitaltc"
    class="chs.bridges.adaptors.tceng.TCDesignFormat"
    description="Teamcenter - Capital Design Integration"
    suffix="xml"
    propFile="resources/TC.properties"
    applications="Logic Designer, Project Manager, Systems Integrator, Harness Designer, Harness Designer Modular, Modeler,Architect"
/>

<document format="capitaltclib"
    class="chs.bridges.adaptors.tclib.TCLibraryCompFormat"
    description="Teamcenter - Capital Library integration"
    suffix="xml"
    propFile="resources/TCComp.properties"
    applications="Component Manager"
/>

<document format="capitaltc"
    class="chs.bridges.adaptors.tceng.TCRequirementFormat"
    description="Teamcenter - Capital Requirements Linking"
    suffix="xml"
    propFile="resources/TCLink.properties"
    applications="Logic Designer, Systems Integrator, Harness Designer, Harness Designer Modular, Modeler,Architect"
/>
<handshake localport="49902"
    remoteapplication="TCConnect" 
    remotehost="TC-X_Host" 
    remoteport="443"
/>
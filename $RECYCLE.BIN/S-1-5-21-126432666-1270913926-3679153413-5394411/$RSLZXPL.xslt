<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
    version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tc="http://www.tcxml.org/Schemas/TCXMLSchema"
    exclude-result-prefixes="tc">

    <!-- ===================================================== -->
    <!-- Output -->
    <!-- ===================================================== -->
    <xsl:output method="xml" encoding="UTF-8" indent="no"/>

    <!-- ===================================================== -->
    <!-- Root -->
    <!-- ===================================================== -->
    <xsl:template match="/tc:TCXML">
        <xsl:text>&#10;</xsl:text> <!-- newline before TCXML -->
        <TCXML xmlns="http://www.tcxml.org/Schemas/TCXMLSchema">
            <xsl:copy-of select="@*"/>
            <xsl:apply-templates/>
            <xsl:text>&#10;</xsl:text> <!-- newline before closing tag -->
        </TCXML>
    </xsl:template>

    <!-- ===================================================== -->
    <!-- Identity -->
    <!-- ===================================================== -->
    <xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>

    <!-- ===================================================== -->
    <!-- Cad0Design -->
    <!-- ===================================================== -->
    <xsl:template match="tc:Cad0Design[@object_type='Cad0Design']">
        <xsl:element name="VER4NX" namespace="http://www.tcxml.org/Schemas/TCXMLSchema">

            <xsl:apply-templates select="@*"/>

            <xsl:attribute name="ead_paragraph">
                <xsl:value-of select="normalize-space(@Cad0PartCategories)"/>
            </xsl:attribute>

            <xsl:apply-templates select="node()"/>
        </xsl:element>
    </xsl:template>

    <!-- ===================================================== -->
    <!-- Cad0DesignRevision -->
    <!-- ===================================================== -->
    <xsl:template match="tc:Cad0DesignRevision[@object_type='Cad0DesignRevision']">
        <xsl:element name="VER4NXRevision" namespace="http://www.tcxml.org/Schemas/TCXMLSchema">

            <xsl:apply-templates select="@*"/>

            <xsl:attribute name="ver4_class">
                <xsl:value-of select="normalize-space(@cad0Class)"/>
            </xsl:attribute>

            <xsl:attribute name="ver4_cost">
                <xsl:value-of select="normalize-space(@cad0Cost)"/>
            </xsl:attribute>

            <xsl:attribute name="ver4_Hardness">
                <xsl:value-of select="normalize-space(@cad0Hardness)"/>
            </xsl:attribute>

            <xsl:attribute name="ver4_make_buy">
                <xsl:value-of select="normalize-space(@cad0MakeOrBuy)"/>
            </xsl:attribute>

            <xsl:attribute name="ver4_material">
                <xsl:value-of select="normalize-space(@cad0Material)"/>
            </xsl:attribute>

            <xsl:attribute name="ver4_part_number">
                <xsl:value-of select="normalize-space(@cad0PartNumber)"/>
            </xsl:attribute>

            <xsl:attribute name="ver4_process">
                <xsl:value-of select="normalize-space(@cad0Process)"/>
            </xsl:attribute>

            <xsl:attribute name="ver4_system_code">
                <xsl:value-of select="normalize-space(@cad0SystemCode)"/>
            </xsl:attribute>

            <xsl:apply-templates select="node()"/>
        </xsl:element>
    </xsl:template>

    <!-- ===================================================== -->
    <!-- MasterS -->
    <!-- ===================================================== -->
    <xsl:template match="tc:Cad0DesignMasterS">
        <xsl:element name="VER4NXMasterS" namespace="http://www.tcxml.org/Schemas/TCXMLSchema">
            <xsl:apply-templates select="@*|node()"/>
        </xsl:element>
    </xsl:template>

    <xsl:template match="tc:Cad0DesignRevMasterS">
        <xsl:element name="VER4NXRevMasterS" namespace="http://www.tcxml.org/Schemas/TCXMLSchema">
            <xsl:apply-templates select="@*|node()"/>
        </xsl:element>
    </xsl:template>

    <!-- ===================================================== -->
    <!-- Attribute value mappings -->
    <!-- ===================================================== -->

    <xsl:template match="@object_class[.='Cad0Design']">
        <xsl:attribute name="object_class">VER4NX</xsl:attribute>
    </xsl:template>

    <xsl:template match="@object_type[.='Cad0Design']">
        <xsl:attribute name="object_type">VER4NX</xsl:attribute>
    </xsl:template>

    <xsl:template match="@object_class[.='Cad0DesignRevision']">
        <xsl:attribute name="object_class">VER4NXRevision</xsl:attribute>
    </xsl:template>

    <xsl:template match="@object_type[.='Cad0DesignRevision']">
        <xsl:attribute name="object_type">VER4NXRevision</xsl:attribute>
    </xsl:template>

    <xsl:template match="@object_type[.='Cad0DesignMaster']">
        <xsl:attribute name="object_type">VER4NXMaster</xsl:attribute>
    </xsl:template>

    <xsl:template match="@object_class[.='Cad0DesignMasterS']">
        <xsl:attribute name="object_class">VER4NXMasterS</xsl:attribute>
    </xsl:template>

    <xsl:template match="@object_type[.='Cad0DesignMasterS']">
        <xsl:attribute name="object_type">VER4NXMasterS</xsl:attribute>
    </xsl:template>

    <xsl:template match="@object_type[.='Cad0DesignRevisionMaster']">
        <xsl:attribute name="object_type">VER4NXRevisionMaster</xsl:attribute>
    </xsl:template>

    <xsl:template match="@object_class[.='Cad0DesignRevMasterS']">
        <xsl:attribute name="object_class">VER4NXRevMasterS</xsl:attribute>
    </xsl:template>

    <xsl:template match="@object_type[.='Cad0DesignRevMasterS']">
        <xsl:attribute name="object_type">VER4NXRevMasterS</xsl:attribute>
    </xsl:template>

</xsl:stylesheet>
